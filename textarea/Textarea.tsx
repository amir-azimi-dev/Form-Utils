"use client";

import { useState } from "react";
import TextareaPropType from "./textarea.props.types";

function Textarea({
    id,
    label,
    rows = 4,
    value,
    onChange,
    disabled,
    readOnly
}: TextareaPropType) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div
            className="relative z-0 w-full border-gray-300 focus-within:border-gray-500 border rounded">
            <label
                htmlFor={id}
                className={`block absolute ${(isFocused || value) ? "top-0 px-2 text-xs" : "top-4"} right-3 z-10 text-sm ${disabled ? "bg-gray-200 text-gray-400" : "bg-white text-gray-700"} -translate-y-1/2 transition-all`}
            >
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-1.5 focus:outline-none disabled:bg-gray-200 rounded"
                rows={rows}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                readOnly={readOnly}
            />
        </div>
    )
}

export default Textarea;