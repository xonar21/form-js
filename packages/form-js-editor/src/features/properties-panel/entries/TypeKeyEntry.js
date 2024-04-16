import { get } from "min-dash";

import { INPUTS } from "../Util";

import { ToggleSwitchEntry, isToggleSwitchEntryEdited } from "@bpmn-io/properties-panel";

export function TypeKeyEntry(props) {
  const { editField, field } = props;

  const entries = [];

  entries.push({
    id: "typeKey",
    component: TypeKey,
    editField: editField,
    field: field,
    isEdited: isToggleSwitchEntryEdited,
    isDefaultVisible: field => INPUTS.includes(field.type),
  });

  return entries;
}

function TypeKey(props) {
  const { editField, field, id } = props;

  const path = ["typeKey"];

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = value => {
    return editField(field, path, value);
  };

  return ToggleSwitchEntry({
    element: field,
    getValue,
    id,
    label: "Type Key",
    tooltip: "If you need to set a unique key that is not in the list, set switch to true.",
    inline: true,
    setValue,
  });
}
