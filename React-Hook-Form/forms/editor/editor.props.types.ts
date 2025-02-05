import { Dispatch, SetStateAction } from "react";

type EditorPropType = {
    placeholder: string;
    isValid?: boolean;
    error?: string;
    onChange: Dispatch<SetStateAction<string>>,
};

export default EditorPropType;