import { isString, get } from 'min-dash';

import { hasIntegerPathSegment, isValidDotPath } from '../Util';

import { useService } from '../hooks';

import { isSelectEntryEdited, SelectEntry } from '@bpmn-io/properties-panel';
import { useCallback } from 'preact/hooks';


export function KeyEntry(props) {
  const {
    editField,
    field,
    getService
  } = props;

  const entries = [];

  entries.push({
    id: 'key',
    component: Key,
    editField: editField,
    field: field,
    isEdited: isSelectEntryEdited,
  });

  return entries;
}

function Key(props) {
  const {
    editField,
    field,
    id
  } = props;

  const pathRegistry = useService('pathRegistry');

  const debounce = useService('debounce');

  const path = [ 'key' ];

  const getValue = () => {
    return get(field, path, '');
  };

  const setValue = (value, error) => {
    if (error) {
      return;
    }

    return editField(field, path, value);
  };

  const validate = useCallback((value) => {

    if (value === field.key) {
      return null;
    }

    if (!isString(value) || value.length === 0) {
      return 'Must not be empty.';
    }

    if (!isValidDotPath(value)) {
      return 'Must be a variable or a dot separated path.';
    }

    if (hasIntegerPathSegment(value)) {
      return 'Must not contain numerical path segments.';
    }

    const replacements = {
      [ field.id ]: value.split('.')
    };

    const oldPath = pathRegistry.getValuePath(field);
    const newPath = pathRegistry.getValuePath(field, { replacements });

    // unclaim temporarily to avoid self-conflicts
    pathRegistry.unclaimPath(oldPath);
    const canClaim = pathRegistry.canClaimPath(newPath, { isClosed: true, claimerId: field.id });
    pathRegistry.claimPath(oldPath, { isClosed: true, claimerId: field.id });
    console.log('fddfd')
    return canClaim ? null : 'Must not conflict with other key/path assignments.';
   
  }, [ field, pathRegistry ]);


  const getOptions = () => {
    return useService('keyParameters') ? useService('keyParameters') : [];
  };

  return SelectEntry({
    debounce,
    element: field,
    id,
    label: 'Key',
    getOptions,
    getValue,
    setValue,
    validate
  });
}