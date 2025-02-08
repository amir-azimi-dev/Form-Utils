import { KeyboardEventHandler } from "react";
export type InputTypes = "text" | "number" | "file" | "password";

type InputValueType<T extends InputTypes> = T extends "number" ? number :
    T extends "file" ? undefined :
    T extends "checkbox" ? boolean :
    string;

type InputBasePropType = {
    name: string;
    label: string;
    isValid?: boolean;
    error?: string;
    onChange: (value: string | Date | File) => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    disabled?: boolean;
    readOnly?: boolean;
};

type InputPropType<T extends InputTypes> = T extends "file" ?
    InputBasePropType & { type: T; value?: InputValueType<T> } :
    InputBasePropType & { type: T; value: InputValueType<T> };

export default InputPropType;