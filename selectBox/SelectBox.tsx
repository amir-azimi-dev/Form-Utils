"use client";

import { useEffect, useState } from "react";
import SelectBoxPropType from "./selectBox.props.types";
import Select from "react-select";
import { SelectSingleValueType } from "./selectBox.props.types";
import "./selectBox.css";

const SelectBox = ({ label, items, onSelect }: SelectBoxPropType) => {
    const [isSelectBoxReady, setIsSelectBoxReady] = useState<boolean>(false);

    useEffect(() => {
        setIsSelectBoxReady(true)
    }, []);

    if (!isSelectBoxReady) {
        return <span></span>
    }

    return (
        <Select
            options={items}
            placeholder={label}
            isRtl={true}
            isClearable={true}
            onChange={(newValue, _) => onSelect(newValue as SelectSingleValueType)}
            classNamePrefix="custom-select"
        />
    );
};

export default SelectBox;