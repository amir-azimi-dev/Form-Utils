import { Value } from "react-multi-date-picker";

type DatePickerPropType = {
    value: Value;
    placeholder: string;
    onChange: (date: Value) => void;
    minDate?: Date;
    maxDate?: Date;
};

export default DatePickerPropType;