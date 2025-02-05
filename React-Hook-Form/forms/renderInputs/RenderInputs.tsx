import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import Input from "@/components/modules/forms/input/Input";
import { AllInputTypesType, InputInfoType } from "@/global.props.types";
import { InputTypes } from "../input/input.props.types";
import SelectBox from "@/components/modules/forms/selectBox/SelectBox";
import DatePicker from "@/components/modules/forms/datePicker/DatePicker";
import RenderInputsPropType from "./renderInputs.props.types";

const Editor = dynamic(() => import("@/components/modules/forms/editor/Editor"), { ssr: false });

function RenderInputs({ inputsData, control, getValues, getFieldState, errors, excludedInputTypes }: RenderInputsPropType) {
    const getFieldStatus = (fieldName: string, type: AllInputTypesType) => {
        const fieldState = getFieldState(fieldName);
        const isFieldDirty: boolean = fieldState.isDirty;
        const fieldError: string | undefined = errors[fieldName]?.message as string | undefined;

        const isFieldValid: boolean | undefined = (type !== "file") ?
            isFieldDirty && !fieldError :
            (fieldError ? false : Boolean(getValues(fieldName)));

        return {
            isFieldValid,
            fieldError,
        };
    };

    return (
        inputsData.map((data: InputInfoType) => !excludedInputTypes?.includes(data.type) && (
            (data.type === "select") ? (
                <Controller
                    key={data.name}
                    name={data.name}
                    control={control}
                    render={({ field }) => (
                        <SelectBox
                            {...field}
                            label={data.label}
                            items={data.items}
                            onSelect={data.onSelect}
                            error={getFieldStatus(data.name, data.type).fieldError}
                            isValid={getFieldStatus(data.name, data.type).isFieldValid}
                            disabled={data.disabled}
                        />
                    )}
                />
            ) : (data.type === "editor") ? (
                <div key={data.name} className="col-span-1 sm:col-span-2">
                    <Controller
                        name={data.name}
                        control={control}
                        render={({ field }) => (
                            <Editor
                                {...field}
                                placeholder={data.placeholder}
                                error={getFieldStatus(data.name, data.type).fieldError}
                                isValid={getFieldStatus(data.name, data.type).isFieldValid}
                            />
                        )}
                    />
                </div>
            ) : (data.type === "date") ? (
                <Controller
                    key={data.name}
                    name={data.name}
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            name={data.name}
                            placeholder="تاریخ تاسیس سازمان"
                            maxDate={new Date()}
                            error={getFieldStatus(data.name, data.type).fieldError}
                            isValid={getFieldStatus(data.name, data.type).isFieldValid}
                        />
                    )}
                />
            ) : (
                <Controller
                    key={data.name}
                    name={data.name}
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type={data.type as InputTypes}
                            label={data.label}
                            error={getFieldStatus(data.name, data.type).fieldError}
                            isValid={getFieldStatus(data.name, data.type).isFieldValid}
                            disabled={data.disabled}
                            readOnly={data.readonly}
                        />
                    )}
                />
            )
        ))
    )
}

export default RenderInputs