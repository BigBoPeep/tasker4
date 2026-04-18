import { useSignals } from "@preact/signals-react/runtime";
import { Square, SquareDashed, Check } from "lucide-react";

export default function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  className = "",
}) {
  useSignals();

  return (
    <label
      className={`group/cb flex items-center gap-2.5 cursor-pointer select-none w-fit 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        {disabled ? (
          <SquareDashed />
        ) : (
          <Square className="overflow-visible">
            <Check
              className={`stroke-7 origin-center -skew-x-12 -translate-y-0.5 
                transition-transform transform-gpu ease-bounce duration-300
                ${checked ? "scale-125" : "scale-0"}`}
            />
          </Square>
        )}
      </div>
      {label && <span>{label}</span>}
    </label>
  );
}
