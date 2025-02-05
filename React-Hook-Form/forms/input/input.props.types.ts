export type InputTypes = "text" | "number" | "file" | "password";

type InputValueType<T extends InputTypes> = T extends "number" ? number :
    T extends "file" ? undefined :
    string;

type InputBasePropType = {
    name: string;
    label: string;
    isValid?: boolean;
    error?: string | undefined;
    onChange: (value: string | Date | File) => void;
    onClick?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
};

type InputPropType<T extends InputTypes> = T extends "file" ?
    InputBasePropType & { type: T; value?: InputValueType<T> } :
    InputBasePropType & { type: T; value: InputValueType<T> };

export default InputPropType;