import cn from "classnames";

import "./index.scss";

interface Props<T extends { toString: () => string }> {
  className?: string;
  label: string;
  name: string;
  options: Array<T>;
  value: T;
  onChange: (newValue: T) => void;
  toKey?: (t: T) => string;
}

export function RadioGroup<T extends { toString: () => string }>({
  className,
  label,
  name,
  options,
  value,
  onChange,
  // Default toKey is essential just id
  toKey = (x) => x.toString(),
}: Props<T>) {
  return (
    <div className={cn("radio-group", className)}>
      <div className="label">{label}</div>
      <div className="radio-inputs">
        {options.map((opt: T) => (
          <label key={toKey(opt)}>
            <input
              type="radio"
              name={name}
              checked={opt === value}
              onChange={() => onChange(opt)}
            />
            {opt.toString()}
          </label>
        ))}
      </div>
    </div>
  );
}
