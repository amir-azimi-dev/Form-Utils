import { SingleValue } from "react-select";

export type SelectSingleValueType = SingleValue<{ id: string, label: string, value: string | 0 }>;

type SelectBoxPropType = {
    label: string;
    value?: SelectSingleValueType | SelectSingleValueType[];
    isValid?: boolean;
    error?: string | undefined;
    onSelect?: (data: SelectSingleValueType | SelectSingleValueType[]) => void;
    onChange: (data: SelectSingleValueType | SelectSingleValueType[]) => void;
    items: SelectSingleValueType[];
    multiple?: boolean;
    className?: string;
    containerClassName?: string;
    disabled?: boolean;
};

export default SelectBoxPropType;

