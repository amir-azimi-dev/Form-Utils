import { InputTypes } from "./components/modules/forms/input/input.props.types";
import { SelectSingleValueType } from "./components/modules/forms/selectBox/selectBox.props.types";

export type AllInputTypesType = InputTypes | "select" | "editor" | "date";

type SingleInputInfoType<T extends AllInputTypesType> = T extends "select" ? {
    name: string;
    type: "select";
    label: string;
    items: SelectSingleValueType[];
    onSelect?: (data: null | SelectSingleValueType) => void;
    disabled?: boolean;
} :
    T extends "editor" ? {
        name: string;
        type: "editor";
        placeholder: string;
    } : T extends "date" ? {
        name: string;
        type: "date";
        label: string;
        disabled?: boolean;
        readonly?: boolean;
    } : T extends InputTypes ? {
        name: string;
        type: InputTypes;
        label: string;
        disabled?: boolean;
        readonly?: boolean;
    } : {};

export type InputInfoType = (SingleInputInfoType<"select"> | SingleInputInfoType<InputTypes> | SingleInputInfoType<"editor"> | SingleInputInfoType<"date">);

export default SingleInputInfoType;