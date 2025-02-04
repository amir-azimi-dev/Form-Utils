import { ChangeEventHandler } from "react";

type TextareaPropType = {
    id: string;
    label: string;
    rows?: number;
    value: string;
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;  // remove ? later
    disabled?: boolean;
    readOnly?: boolean;
};

export default TextareaPropType;