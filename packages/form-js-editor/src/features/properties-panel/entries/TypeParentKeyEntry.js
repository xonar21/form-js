import { get } from "min-dash";

import { INPUTS } from "../Util";

import { ToggleSwitchEntry, isToggleSwitchEntryEdited } from "@bpmn-io/properties-panel";

export function TypeParentKeyEntry(props) {
  const { editField, field } = props;

  const entries = [];

  entries.push({
    id: "typeParentKey",
    component: TypeParentKey,
    editField: editField,
    field: field,
    isEdited: isToggleSwitchEntryEdited,
    isDefaultVisible: field => INPUTS.includes(field.type),
  });

  return entries;
}

function TypeParentKey(props) {
  const { editField, field, id } = props;

  const path = ["typeParentKey"];

  const isChildSelectValue = get(field, ['isChildSelect'], "")

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = value => {
    return editField(field, path, value);
  };

  return isChildSelectValue ? ToggleSwitchEntry({
    element: field,
    getValue,
    id,
    label: "Type parent key",
    tooltip: "If you need to set a unique key that is not in the list, set switch to true.",
    inline: true,
    setValue,
  }) : null ;
}
