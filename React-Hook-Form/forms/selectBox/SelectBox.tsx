"use client";

import { forwardRef, useEffect, useState } from "react";
import SelectBoxPropType from "./selectBox.props.types";
import Select, { SelectInstance } from "react-select";
import { SelectSingleValueType } from "./selectBox.props.types";
import "./selectBox.css";

const SelectBox = forwardRef<SelectInstance, SelectBoxPropType>(({
    label,
    items,
    isValid,
    error,
    onChange,
    onSelect,
    disabled }, ref) => {

    const [isSelectBoxReady, setIsSelectBoxReady] = useState<boolean>(false);

    useEffect(() => {
        setIsSelectBoxReady(true)
    }, []);

    if (!isSelectBoxReady) {
        return null;
    }

    return (
        <div className={error ? "wrong-selection" : isValid ? "successful-selection" : "untouched-selection"}>
            <Select
                ref={ref}
                options={items}
                placeholder={label}
                isRtl={true}
                isClearable={true}
                onChange={(newValue, _) => {
                    onSelect && onSelect(newValue as SelectSingleValueType);
                    onChange(newValue as SelectSingleValueType);
                }}
                classNamePrefix="custom-select"
                isDisabled={disabled}
            />
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    );
});

export default SelectBox;