import { ChangeEventHandler } from "react";

type InputValueType<T extends "text" | "number" | "file" | "password"> = T extends "number" ? number :
    T extends "file" ? undefined :
    string;

type InputBasePropType = {
    id: string;
    label: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;  // remove ? later
    onClick?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
};

type InputPropType<T extends "text" | "number" | "file" | "password"> = T extends "file" ?
    InputBasePropType & { type: T; value?: InputValueType<T> } :
    InputBasePropType & { type: T; value: InputValueType<T> };

export default InputPropType;