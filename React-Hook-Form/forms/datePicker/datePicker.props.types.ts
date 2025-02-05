import { Value } from "react-multi-date-picker";

type DatePickerPropType = {
    name: string;
    value: Value;
    placeholder: string;
    onChange: (date: Value) => void;
    isValid?: boolean;
    error?: string | undefined;
    minDate?: Date;
    maxDate?: Date;
};

export default DatePickerPropType;