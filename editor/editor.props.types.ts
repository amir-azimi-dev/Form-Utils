import { Dispatch, SetStateAction } from "react";

type EditorPropType = {
    placeholder: string;
    onChange: Dispatch<SetStateAction<string>>
};

export default EditorPropType;