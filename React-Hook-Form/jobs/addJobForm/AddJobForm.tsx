"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import useRHF from "@/hooks/useRHF";
import { Controller } from "react-hook-form";
import jobSchema, { initialValues } from "@/schemas/job";
import SectionContainer from "@/components/modules/admin-panel/section-container/SectionContainer";
import Input from "@/components/modules/forms/input/Input";
import { InputTypes } from "@/components/modules/forms/input/input.props.types";
import SelectBox from "@/components/modules/forms/selectBox/SelectBox";
import { SelectSingleValueType } from "@/components/modules/forms/selectBox/selectBox.props.types";
import RequiredSkills from "./requiredSkills/RequiredSkills";
import contractTypes from "@/../db/contractTypes.json";
import workPrecedents from "@/../db/workPrecedents.json";
import salaryOptions from "@/../db/salaryOptions.json";
import genders from "@/../db/genders.json";
import dutyStatuses from "@/../db/dutyStatuses.json";
import qualifications from "@/../db/qualifications.json";

const Editor = dynamic(() => import("@/components/modules/forms/editor/Editor"), { ssr: false });

const jobCategories = [
  {
    id: "1",
    label: "توسعه‌ی نرم افزار و برنامه نویسی",
    value: "1"
  },
  {
    id: "2",
    label: "بازاریابی",
    value: "2"
  },
  {
    id: "3",
    label: "تست نرم افزار",
    value: "3"
  },
  {
    id: "4",
    label: "مهندسی داده",
    value: "4"
  },
];

const organizations = [
  {
    id: "1",
    label: "نام سازمان ۱",
    value: "organization-1",
  },
  {
    id: "2",
    label: "نام سازمان ۲",
    value: "organization-2",
  },
  {
    id: "3",
    label: "نام سازمان ۳",
    value: "organization-3",
  },
]

type InputDataType<T extends InputTypes | "select"> = T extends "select" ? {
  name: string;
  type: "select";
  label: string;
  items: SelectSingleValueType[];
  onSelect?: (data: null | SelectSingleValueType) => void;
  disabled?: boolean;
} : {
  name: string;
  type: InputTypes;
  label: string;
  disabled?: boolean;
  readonly?: boolean;
};

function AddJobForm() {
  const { control, handleSubmit, formState: { isValid, errors, isSubmitted, dirtyFields } } = useRHF({ schema: jobSchema, initialValues });

  const [isCustomSalaryInputEnabled, setIsCustomSalaryInputEnabled] = useState<boolean>(false);
  const [isDutyStatusInputEnabled, setIsDutyStatusInputEnabled] = useState<boolean>(false);

  const selectSalaryOption = (salaryOptionData: null | SelectSingleValueType) => salaryOptionData?.id === salaryOptions[2].id ? setIsCustomSalaryInputEnabled(true) : setIsCustomSalaryInputEnabled(false);

  const selectGender = (qualificationData: null | SelectSingleValueType) => {
    qualificationData?.id === salaryOptions[0].id ? setIsDutyStatusInputEnabled(true) : setIsDutyStatusInputEnabled(false);
  };

  const inputsData: (InputDataType<"select"> | InputDataType<InputTypes>)[] = [
    { name: "title", type: "text", label: "عنوان شغل" },
    { name: "jobCategory", type: "select", label: "دسته‌بندی شغلی", items: jobCategories },
    { name: "organization", type: "select", label: "عنوان سازمان", items: organizations },
    { name: "contractType", type: "select", label: "نوع قرارداد", items: contractTypes },
    { name: "workPrecedent", type: "select", label: "سابقه کار", items: workPrecedents },
    { name: "salaryOption", type: "select", label: "حقوق ماهانه", items: salaryOptions, onSelect: selectSalaryOption },
    { name: "salaryAmount", type: "text", label: "حداقل حقوق ماهانه (میلیون تومان)", disabled: !isCustomSalaryInputEnabled },
    { name: "gender", type: "select", label: "جنسیت", items: genders, onSelect: selectGender },
    { name: "dutyStatus", type: "select", label: "وضعیت نظام وظیفه", items: dutyStatuses, disabled: !isDutyStatusInputEnabled },
    { name: "qualification", type: "select", label: "مدرک تحصیلی", items: qualifications }
  ];

  const getFieldStatus = (fieldName: string) => {
    const isFieldDirty: boolean = dirtyFields[fieldName];
    const fieldError: string | undefined = errors[fieldName] ? String(errors[fieldName].message) : undefined;
    const isFieldValid: boolean = isFieldDirty && !fieldError;

    return {
      isFieldValid,
      fieldError,
    };
  };

  const addJobHandler = (data: Record<string, any>) => {
    console.log(data);
  };

  return (
    <SectionContainer title="افزودن شغل">
      <form onSubmit={handleSubmit(addJobHandler)}
        className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {inputsData.map((data) => (data.type === "select") ? (
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
                error={getFieldStatus(data.name).fieldError}
                isValid={getFieldStatus(data.name).isFieldValid}
                disabled={data.disabled}
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
                error={getFieldStatus(data.name).fieldError}
                isValid={getFieldStatus(data.name).isFieldValid}
                disabled={data.disabled}
                readOnly={data.readonly}
              />
            )}
          />
        ))}

        <div className="col-span-1 sm:col-span-2">
          <RequiredSkills />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Editor
                {...field}
                placeholder="توضیحات ..."
                error={getFieldStatus("description").fieldError}
                isValid={getFieldStatus("description").isFieldValid}
              />
            )}
          />
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-end">
          <button
            className="block w-fit mt-3 px-4 py-2 bg-green-500 disabled:opacity-60 rounded-lg font-kalame-semibold text-white transition-colors disabled:cursor-not-allowed hover:bg-green-600"
            disabled={isSubmitted && !isValid}
          >
            افزودن شغل
          </button>
        </div>
      </form>
    </SectionContainer >
  )
}

export default AddJobForm;