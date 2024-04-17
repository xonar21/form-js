import { isString, get } from "min-dash";

import { hasIntegerPathSegment, isValidDotPath } from "../Util";

import { useService } from "../hooks";

import { isSelectEntryEdited, SelectEntry, TextFieldEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { useCallback } from "preact/hooks";

export function ReferenceTableEntry(props) {
  const { editField, field, getService } = props;
  const typeKeyValue = get(field, ['typeKey'], "")
  const entries = [];

  entries.push({
    id: "refField",
    component: ReferenceTable,
    editField: editField,
    field: field,
    isEdited: !typeKeyValue ? isSelectEntryEdited : isTextFieldEntryEdited
  });

  return entries;
}

function ReferenceTable(props) {
  const { editField, field, id } = props;

  const debounce = useService("debounce");

  const path = ["refField"];

  const isSelectField = field.type === 'select'

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = (value, error) => {
    if (error) {
      return;
    }

    return editField(field, path, value);
  };

  const getOptions = () => {
    return useService("referenceTables") ? useService("referenceTables") : [];
  };

  return isSelectField ? SelectEntry({
    debounce,
    element: field,
    id,
    label: "Reference table",
    getOptions,
    getValue,
    setValue,
  }) : null;
}
