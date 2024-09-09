import { Controller, useFormContext } from "react-hook-form";

type TOptions = {
  label: string;
  value: string;
};

type TSelectProps = {
  type: string;
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
      render={({ field }) => (
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
            <option disabled selected>
              {placeholder}
            </option>
            {options?.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      )}
    />
  );
};

export default TSelect;
