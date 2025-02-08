import { memo } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import Input from "@/components/modules/forms/input/Input";
import { AllInputTypesType, InputInfoType } from "@/global.props.types";
import SelectBox from "@/components/modules/forms/selectBox/SelectBox";
import DatePicker from "@/components/modules/forms/datePicker/DatePicker";
import Checkbox from "../checkbox/Checkbox";
import Textarea from "../textarea/Textarea";
import RenderInputsPropType from "./renderInputs.props.types";

const Editor = dynamic(() => import("@/components/modules/forms/editor/Editor"), { ssr: false });

const RenderInputs = memo(({
    inputsData,
    control,
    getValues,
    getFieldState,
    errors,
    excludedInputTypes,
    includedInputTypes }: RenderInputsPropType) => {

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

    const isRenderFieldAllowed = (data: InputInfoType) => includedInputTypes?.length ?
        includedInputTypes?.includes(data.type) :
        !excludedInputTypes?.includes(data.type);

    return (
        inputsData.map((data: InputInfoType) => isRenderFieldAllowed(data) && (
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
                            multiple={data.multiple}
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
            ) : (data.type === "checkbox") ? (
                <Controller
                    key={data.name}
                    name={data.name}
                    control={control}
                    render={({ field }) => (
                        <Checkbox
                            {...field}
                            id={data.name}
                            label={data.label}
                        />
                    )}
                />
            ) : (data.type === "textarea") ? (
                <Controller
                    key={data.name}
                    name={data.name}
                    control={control}
                    render={({ field }) => (
                        <Textarea
                            {...field}
                            label={data.label}
                            error={getFieldStatus(data.name, data.type).fieldError}
                            isValid={getFieldStatus(data.name, data.type).isFieldValid}
                            disabled={data.disabled}
                            readOnly={data.readonly}
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
                            type={data.type}
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
})

export default RenderInputs