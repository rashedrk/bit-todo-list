import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TOptions = {
  label: ReactNode,
  value: string;
};

type TSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  options: TOptions[];
};
const TSelect = ({
  name,
  label,
  options,
  disabled = false,
  className,
  placeholder,
}: TSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field,fieldState: { error }  }) => (
        <label className="form-control w-full">
          {label && (
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
          )}
          <select
            disabled={disabled}
            {...field}
            className={`select select-bordered w-full  ${className}`}
          >
            <option value={0} disabled selected>
              {placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {
            error && <p className="text-xs text-red-500">{error?.message}</p>
          }
        </label>
      )}
    />
  );
};

export default TSelect;
