"use client";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import DatePickerPropType from "./datePicker.props.types";
import Input from "../input/Input";
import MultiDatePicker, { Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// @ts-ignore
import opacity from "react-element-popper/animations/opacity";
// @ts-ignore
import transition from "react-element-popper/animations/transition";
import "react-multi-date-picker/styles/colors/green.css"

const DatePicker = forwardRef<HTMLInputElement, DatePickerPropType>(({ name, error, isValid, value, onChange, placeholder, minDate, maxDate }, ref) => {
    const [date, setDate] = useState<Value>(placeholder);
    const selectDateHandler = (date: Value) => {
        if (!date?.valueOf) {
            return;
        }

        const selectedDate = new Date(date.valueOf());
        onChange(selectedDate);
    };

    return (
        <div className="w-full">
            <MultiDatePicker
                calendar={persian}
                value={value}
                onChange={selectDateHandler}
                placeholder={placeholder}
                minDate={minDate}
                maxDate={maxDate}
                locale={persian_fa}
                calendarPosition="bottom-right"
                containerClassName="w-full"
                render={(value, openCalendar) => (
                    <Input
                        ref={ref}
                        name={name}
                        label="تاریخ تاسیس سازمان"
                        type="text"
                        value={value}
                        onChange={() => ""}
                        onClick={openCalendar}
                        isValid={isValid}
                        error={error}
                        readOnly
                    />
                )}
                className="green"
                animations={[transition({ from: 35 }), opacity()]}
                hideOnScroll
            />
        </div>
    )
});

export default DatePicker