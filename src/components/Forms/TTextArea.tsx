import { Controller, useFormContext } from "react-hook-form";
type TTextAreaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
  };
const TTextArea = ({ name, label, placeholder, disabled = false, className }: TTextAreaProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <label className="form-control w-full">
                    {
                        label && <div className="label">
                            <span className="label-text">{label}</span>
                        </div>
                    }
                    <textarea
                        {...field}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`input input-bordered w-full input-md ${className}`}
                    />
                </label>
            )}
        />
    );
};

export default TTextArea;