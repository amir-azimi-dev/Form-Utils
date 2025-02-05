import { InputInfoType, AllInputTypesType } from "@/global.props.types";
import { Control, FieldErrors, UseFormGetFieldState, UseFormGetValues } from "react-hook-form";

type RenderInputsPropType = {
    inputsData: InputInfoType[];
    control: Control<any, any>;
    errors: FieldErrors<any>;
    getValues: UseFormGetValues<any>;
    getFieldState: UseFormGetFieldState<any>;
    excludedInputTypes?: AllInputTypesType[];
};

export default RenderInputsPropType;