import { SingleValue } from "react-select";

export type SelectSingleValueType = SingleValue<{ id: string, label: string, value: string | 0 }>;

type SelectBoxPropType = {
    label: string;
    isValid: boolean;
    error?: string | undefined;
    onSelect?: (data: null | SelectSingleValueType) => void;
    onChange: (data: null | SelectSingleValueType) => void;
    items: SelectSingleValueType[];
    disabled?: boolean;
};

export default SelectBoxPropType;

