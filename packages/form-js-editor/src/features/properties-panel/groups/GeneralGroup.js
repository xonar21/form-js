import {
  ActionEntry,
  AltTextEntry,
  DescriptionEntry,
  DefaultValueEntry,
  DisabledEntry,
  IdEntry,
  IFrameUrlEntry,
  IFrameHeightEntry,
  ImageSourceEntry,
  TypeKeyEntry,
  KeyEntry,
  PathEntry,
  RepeatableEntry,
  LabelEntry,
  ReadonlyEntry,
  SelectEntries,
  TextEntry,
  HtmlEntry,
  HeightEntry,
  NumberEntries,
  DateTimeEntry,
  TableDataSourceEntry,
  PaginationEntry,
  RowCountEntry,
  IsChildSelectEntry,
  ParentKeyEntry,
  ReferenceTableEntry,
  TypeParentKeyEntry
} from "../entries";

export function GeneralGroup(field, editField, getService) {
  const entries = [
    ...IdEntry({ field, editField }),
    ...LabelEntry({ field, editField }),
    ...DescriptionEntry({ field, editField }),
    ...TypeKeyEntry({ field, editField, getService }),
    ...KeyEntry({ field, editField, getService }),
    ...ReferenceTableEntry({ field, editField, getService }),
    ...IsChildSelectEntry({ field, editField, getService }),
    ...TypeParentKeyEntry({ field, editField, getService }),
    ...ParentKeyEntry({ field, editField, getService }),
    ...RepeatableEntry({ field, editField, getService }),
    ...DefaultValueEntry({ field, editField }),
    ...ActionEntry({ field, editField }),
    ...DateTimeEntry({ field, editField }),
    ...TextEntry({ field, editField, getService }),
    ...HtmlEntry({ field, editField, getService }),
    ...IFrameUrlEntry({ field, editField }),
    ...IFrameHeightEntry({ field, editField }),
    ...HeightEntry({ field, editField }),
    ...NumberEntries({ field, editField }),
    ...ImageSourceEntry({ field, editField }),
    ...AltTextEntry({ field, editField }),
    ...SelectEntries({ field, editField }),
    ...DisabledEntry({ field, editField }),
    ...ReadonlyEntry({ field, editField }),
    ...TableDataSourceEntry({ field, editField }),
    ...PaginationEntry({ field, editField }),
    ...RowCountEntry({ field, editField }),
  ];

  if (entries.length === 0) {
    return null;
  }

  return {
    id: "general",
    label: "General",
    entries,
  };
}
