import React from "react";
import {
  DayPicker,
  ClassNames,
  DateRange,
  SelectRangeEventHandler,
  Matcher,
} from "react-day-picker";
import dayPickerStyles from "react-day-picker/dist/style.module.css";
import dateRangeInputStyles from "../styles/dateRangeInput.module.scss";

interface DateRangeInputProps {
  range: DateRange | undefined;
  setRange: SelectRangeEventHandler;
  footer: string;
  disabledDays: Matcher[];
  errorMessage: string | null;
}

export const DateRangeInput = ({
  range,
  footer,
  setRange,
  disabledDays,
  errorMessage,
}: DateRangeInputProps) => {
  const dayPickerClassName: ClassNames = {
    ...dayPickerStyles,
    day_today: dateRangeInputStyles.today,
    // day: dateRangeInputStyles.day,
  };
  return (
    <div className={dateRangeInputStyles.container}>
      <DayPicker
        classNames={dayPickerClassName}
        mode="range"
        selected={range}
        footer={footer}
        onSelect={setRange}
        disabled={disabledDays}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
