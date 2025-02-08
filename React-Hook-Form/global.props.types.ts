import { InputTypes } from "./components/modules/forms/input/input.props.types";
import { SelectSingleValueType } from "./components/modules/forms/selectBox/selectBox.props.types";

export type AllInputTypesType = InputTypes | "select" | "editor" | "date" | "checkbox" | "textarea";

type SingleInputInfoType<T extends AllInputTypesType> = T extends "select" ? {
    name: string;
    type: "select";
    multiple?: boolean;
    label: string;
    items: SelectSingleValueType[];
    onSelect?: (data: SelectSingleValueType) => void;
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
    } : T extends "checkbox" ? {
        name: string;
        type: "checkbox";
        label: string;
        disabled?: boolean;
        readonly?: boolean;
    } : {
        name: string;
        type: "textarea";
        label: string;
        disabled?: boolean;
        readonly?: boolean;
    };

export type InputInfoType = SingleInputInfoType<"select"> |
    SingleInputInfoType<"editor"> |
    SingleInputInfoType<"date"> |
    SingleInputInfoType<InputTypes> |
    SingleInputInfoType<"checkbox"> |
    SingleInputInfoType<"textarea">;

export default SingleInputInfoType;