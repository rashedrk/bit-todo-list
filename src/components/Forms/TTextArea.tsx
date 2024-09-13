import { Controller, useFormContext } from "react-hook-form";
type TTextAreaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    defaultValue?: string;
    loading?: boolean;
  };
const TTextArea = ({ name, label, placeholder, disabled = false, className, defaultValue, loading = false }: TTextAreaProps) => {
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
                        placeholder={loading? "Loading...":placeholder}
                        defaultValue={defaultValue}
                        disabled={loading? true : disabled}
                        className={`input input-bordered w-full input-md ${className}`}
                        rows={3}
                        style={{ height: 'auto' }}
                    />
                </label>
            )}
        />
    );
};

export default TTextArea;