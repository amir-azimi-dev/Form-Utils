import { ChangeEventHandler } from "react";

type TextareaPropType = {
    name: string;
    label: string;
    rows?: number;
    value: string;
    isValid?: boolean;
    error?: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    disabled?: boolean;
    readOnly?: boolean;
};

export default TextareaPropType;