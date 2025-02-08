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
    value,
    onChange,
    onSelect,
    multiple,
    containerClassName,
    className,
    disabled }, ref) => {

    const [isSelectBoxReady, setIsSelectBoxReady] = useState<boolean>(false);

    useEffect(() => {
        setIsSelectBoxReady(true)
    }, []);

    if (!isSelectBoxReady) {
        return <div className="w-full h-full bg-gray-100 animate-pulse"></div>;
    }

    return (
        <div className={containerClassName + " " + (error ? "wrong-selection" : isValid ? "successful-selection" : "untouched-selection")}>
            <Select
                ref={ref}
                options={items}
                placeholder={label}
                isMulti={multiple}
                isRtl={true}
                isClearable={true}
                value={value}
                onChange={(newValue, _) => {
                    console.log(newValue)
                    onSelect && onSelect(newValue as SelectSingleValueType | SelectSingleValueType[]);
                    onChange(newValue as SelectSingleValueType | SelectSingleValueType[]);
                }}
                className={className}
                classNamePrefix="custom-select"
                isDisabled={disabled}
            />
            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
        </div>
    );
});

export default SelectBox;