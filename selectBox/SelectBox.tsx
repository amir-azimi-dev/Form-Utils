"use client";

import SelectBoxPropType from "./selectBox.props.types";
import Select from "react-select";
import { SelectSingleValueType } from "./selectBox.props.types";

const SelectBox = ({ label, items, onSelect }: SelectBoxPropType) => {
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