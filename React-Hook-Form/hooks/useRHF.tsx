"use client";

import { useForm, Resolver, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UseRHFPropType from "./useRHF/useRHF.props.types";

function useRHF<T extends Record<string, any>>({ schema, initialValues }: UseRHFPropType<T>) {
    const RHF = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
        mode: "onChange"
    });

    return RHF;
}

export default useRHF;