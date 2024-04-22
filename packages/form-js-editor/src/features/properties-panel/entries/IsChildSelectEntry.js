import { get } from "min-dash";

import { INPUTS } from "../Util";

import { ToggleSwitchEntry, isToggleSwitchEntryEdited } from "@bpmn-io/properties-panel";

export function IsChildSelectEntry(props) {
  const { editField, field } = props;

  const entries = [];

  entries.push({
    id: "isChildSelect",
    component: IsChildSelect,
    editField: editField,
    field: field,
    isEdited: isToggleSwitchEntryEdited,
    isDefaultVisible: field => INPUTS.includes(field.type),
  });

  return entries;
}

function IsChildSelect(props) {
  const { editField, field, id } = props;

  const path = ["isChildSelect"];

  const getValue = () => {
    return get(field, path, "");
  };

  const setValue = value => {
    if (!value) {
      editField(field, ['parentKey'], null)
    }
    return editField(field, path, value);
  };


  return (field.type === 'select' || field.type === 'taglist') ? ToggleSwitchEntry({
    element: field,
    getValue,
    id,
    label: "Is child select",
    tooltip: "Enable this option if your select list is a subordinate.",
    inline: true,
    setValue,
  }) : null;
}
