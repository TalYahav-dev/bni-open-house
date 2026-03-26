interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'tel' | 'select' | 'textarea' | 'number';
  required?: boolean;
  options?: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  required = false,
  options,
  value,
  onChange,
  placeholder,
}: FormFieldProps) {
  const inputClasses =
    'w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground font-heebo placeholder:text-dim focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-colors duration-200';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-charcoal">
        {label}
        {required && <span className="text-copper mr-1">*</span>}
      </label>

      {type === 'select' && options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} cursor-pointer`}
          required={required}
        >
          <option value="">בחרו...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClasses} min-h-[100px] resize-y`}
          required={required}
          placeholder={placeholder}
          rows={3}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
