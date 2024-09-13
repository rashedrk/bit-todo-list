import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>
};

const TInput = ({
  name,
  label,
  type,
  placeholder,
  disabled = false,
  className,
  onBlur
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error }  }) => (
        <label className="form-control w-full">
          {label && (
            <div className="label">
              <span className="label-text">{label}</span>
            </div>
          )}
          <input
            {...field}
            type={type}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={`input input-bordered w-full input-md ${className}`}
          />
          {
            error && <p className="text-xs text-red-500">{error?.message}</p>
          }
        </label>
      )}
    />
  );
};

export default TInput;
