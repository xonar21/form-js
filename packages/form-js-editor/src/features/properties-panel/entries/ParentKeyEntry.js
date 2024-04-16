import { isString, get } from "min-dash";

import { useService } from "../hooks";

import { isSelectEntryEdited, SelectEntry, isTextFieldEntryEdited } from "@bpmn-io/properties-panel";
import { useCallback } from "preact/hooks";

export function ParentKeyEntry(props) {
  const { editField, field, getService } = props;
  const typeKeyValue = get(field, ['typeKey'], "")
  const entries = [];

  entries.push({
    id: "parentKey",
    component: ParentKey,
    editField: editField,
    field: field,
    isEdited: !typeKeyValue ? isSelectEntryEdited : isTextFieldEntryEdited
  });

  return entries;
}

function ParentKey(props) {
  const { editField, field, id } = props;

  const pathRegistry = useService("pathRegistry");

  const debounce = useService("debounce");

  const isChildSelectValue = get(field, ['isChildSelect'], "")

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

  return isChildSelectValue ? SelectEntry({
    debounce,
    element: field,
    id,
    label: "Parent key",
    getOptions,
    getValue,
    setValue,
    validate,
  }) : null;
}
