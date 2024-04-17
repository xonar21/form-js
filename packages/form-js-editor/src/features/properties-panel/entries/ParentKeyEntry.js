import { isString, get } from "min-dash";

import { useService } from "../hooks";

import { isSelectEntryEdited, SelectEntry, TextFieldEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { useCallback, useEffect } from "preact/hooks";

export function ParentKeyEntry(props) {
  const { editField, field, getService } = props;
  const typeParentKeyValue = get(field, ['typeParentKey'], "")
  const entries = [];

  entries.push({
    id: "parentKey",
    component: ParentKey,
    editField: editField,
    field: field,
    isEdited: !typeParentKeyValue ? isSelectEntryEdited : isTextFieldEntryEdited
  });

  return entries;
}

function ParentKey(props) {
  const { editField, field, id } = props;

  const pathRegistry = useService("pathRegistry");

  const debounce = useService("debounce");

  const isChildSelectValue = get(field, ['isChildSelect'], "")

  const typeParentKeyValue = get(field, ['typeParentKey'], "")

  const path = ["parentKey"];

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = (value, error) => {
    if (error) {
      return;
    }

    return editField(field, path, value);
  };

  const validate = useCallback(
    value => {
      if (value === field.parentKey) {
        return null;
      }

      if (!isString(value) || value.length === 0) {
        return "Must not be empty.";
      }

    },
    [field, pathRegistry],
  );

  const getOptions = () => {
    return useService("keyParameters") ? useService("keyParameters") : [];
  };

  return isChildSelectValue ? (!typeParentKeyValue ? SelectEntry({
    debounce,
    element: field,
    id,
    label: "Parent key",
    getOptions,
    getValue,
    setValue,
    validate,
  }) : TextFieldEntry({
    debounce,
    description: 'Binds to a form variable',
    element: field,
    getValue,
    id,
    label: 'Key',
    tooltip:
      'Use a unique "key" to link the form element and the related input/output data. When dealing with nested data, break it down in the user task\'s input mapping before using it.',
    setValue,
    validate,
  }))  : null;
}
