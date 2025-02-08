import { Dispatch, SetStateAction } from "react";

type EditorPropType = {
    placeholder: string;
    isValid?: boolean;
    error?: string;
    value?: string;
    onChange: Dispatch<SetStateAction<string>>,
};

export default EditorPropType;