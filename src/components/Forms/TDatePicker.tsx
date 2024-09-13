import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

type TDateProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const TDatePicker = ({
  name,
  placeholder,
  disabled = false,
  className,
  label,
}: TDateProps) => {
  const { control, getValues } = useFormContext();
  const [startDate, setStartDate] = useState(getValues(name));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <label className="form-control w-full">
          {label && (
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
          )}
          <DatePicker
            {...field}
            selected={startDate}
            onChange={(date) => {
              const formattedDate = date
                ? dayjs(date).format("YYYY-MM-DD")
                : "";

              setStartDate(formattedDate);
              field.onChange(formattedDate);
            }}
            className={`input input-bordered w-full input-md ${className}`}
            disabled={disabled}
            placeholderText={placeholder}
            dateFormat="dd-MM-yyyy"
          />
          {error && <p className="text-xs text-red-500">{error?.message}</p>}
        </label>
      )}
    />
  );
};

export default TDatePicker;
