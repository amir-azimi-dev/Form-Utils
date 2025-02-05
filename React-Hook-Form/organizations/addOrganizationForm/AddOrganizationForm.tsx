"use client";

import { useState } from "react";
import useRHF from "@/hooks/useRHF";
import organizationSchema, { initialValues } from "@/schemas/organization";
import SectionContainer from "@/components/modules/admin-panel/section-container/SectionContainer";
import RenderInputs from "@/components/modules/forms/renderInputs/RenderInputs";
import { InputInfoType } from "@/global.props.types";
import { SelectSingleValueType } from "@/components/modules/forms/selectBox/selectBox.props.types";
import provinces from "@/../db/provinces.json";
import cities from "@/../db/cities.json";


function AddOrganizations() {
  const {
    control,
    getFieldState,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isSubmitted }
  } = useRHF({ schema: organizationSchema, initialValues });

  const [activeCities, setActiveCities] = useState<SelectSingleValueType[]>([{ id: "", label: "اول استان را انتخاب کنید.", value: "" }]);

  const selectProvince = (provinceData: null | SelectSingleValueType) => {
    if (!provinceData) {
      setValue("city", null, { shouldValidate: true });
      return setActiveCities([{ id: "", label: "اول استان را انتخاب کنید.", value: "" }]);
    };

    const activeCities = cities.filter(city => city.province_id === provinceData.id);
    setActiveCities(activeCities);
  };


  const inputsData: InputInfoType[] = [
    { name: "title", type: "text", label: "عنوان سازمان" },
    { name: "province", type: "select", label: "استان", items: provinces, onSelect: selectProvince },
    { name: "city", type: "select", label: "شهر", items: activeCities },
    { name: "foundation", type: "date", label: "تاریخ تاسیس سازمان" },
    { name: "organizationSite", type: "text", label: "وبسایت سازمان (اختیاری)" },
    { name: "staffsCount", type: "text", label: "تعداد کارکنان (اختیاری)" },
    { name: "organizationLogo", type: "file", label: "لوگوی سازمان (اختیاری)" },
    { name: "organizationImage", type: "file", label: "تصویر بزرگ مربوط به سازمان (اختیاری)" },
    { name: "description", type: "editor", placeholder: "معرفی سازمان ..." }
  ];

  const addOrganizationHandler = (data: Record<string, any>) => {
    console.log(data);
  };


  return (
    <SectionContainer title="افزودن سازمان">
      <form onSubmit={handleSubmit(addOrganizationHandler)} className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        <RenderInputs
          inputsData={inputsData}
          control={control}
          errors={errors}
          getFieldState={getFieldState}
          getValues={getValues}
        />

        <div className="col-span-1 sm:col-span-2 flex justify-end">
          <button
            className="block w-fit mt-3 px-4 py-2 bg-green-500 disabled:opacity-60 rounded-lg font-kalame-semibold text-white transition-colors disabled:cursor-not-allowed hover:bg-green-600"
            disabled={isSubmitted && !isValid}
          >
            افزودن سازمان
          </button>
        </div>
      </form>

    </SectionContainer>
  )
}

export default AddOrganizations;