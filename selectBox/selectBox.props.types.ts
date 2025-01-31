import { SingleValue } from "react-select";

export type SelectSingleValueType = SingleValue<{ id: string, label: string, value: string | 0 }>;

type SelectBoxPropType = {
    label: string;
    onSelect: (data: null | SelectSingleValueType) => void;
    items: SelectSingleValueType[];
};

export default SelectBoxPropType;

