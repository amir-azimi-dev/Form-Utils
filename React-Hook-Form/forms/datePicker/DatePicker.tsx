"use client";

import { useState } from "react";
import DatePickerPropType from "./datePicker.props.types";
import Input from "../input/Input";
import MultiDatePicker, { DateObject, Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// @ts-ignore
import opacity from "react-element-popper/animations/opacity";
// @ts-ignore
import transition from "react-element-popper/animations/transition";
import "react-multi-date-picker/styles/colors/green.css"

function DatePicker({ value, onChange, placeholder, minDate, maxDate }: DatePickerPropType) {
    return (
        <div className="w-full">
            <MultiDatePicker

                calendar={persian}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                minDate={minDate}
                maxDate={maxDate}
                locale={persian_fa}
                calendarPosition="bottom-right"
                containerClassName="w-full"
                render={(value, openCalendar) => (
                    <Input
                        name="calender"
                        label="تاریخ تاسیس سازمان"
                        type="text"
                        value={value}
                        onClick={openCalendar}
                        isValid
                        error={undefined}
                        readOnly
                    />
                )}
                className="green"
                animations={[transition({ from: 35 }), opacity()]}
                hideOnScroll
            />
        </div>
    )
}

export default DatePicker