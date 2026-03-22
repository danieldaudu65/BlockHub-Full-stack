import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SlCalender } from "react-icons/sl";

interface DatePickerProps {
    value: string;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
    name: string;
}

const DatePickerInput: React.FC<DatePickerProps> = ({ value, onChange, placeholderText, name }) => {
    const selectedDate = value ? new Date(value) : null;

    return (
        <DatePicker
            showIcon
            selected={selectedDate}
            onChange={onChange}
            icon={<SlCalender />}
            placeholderText={placeholderText || "Select"}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            name={name}
            className="w-full text-gray-200 bg-zinc-900 p-3 px-4 rounded-2xl ring-gray-700 ring-1 focus:outline-none focus:ring-1 focus:ring-blue-main"
            
            calendarClassName="dark-calendar"
            wrapperClassName="dark-datepicker-wrapper"
        />
    );
};

export default DatePickerInput;