import { useState, useEffect } from "react";
import { Check, Square, ChevronLeft } from "lucide-react";

export default function Dropdown({
  options,
  defaultSelected,
  onChange,
  className,
}) {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    if (typeof onChange === "function") onChange(selected);
  }, [selected]);

  return (
    <div
      className={`bg-black/20 relative group/drop rounded-md hover:rounded-b-none 
      transition-all transform-gpu duration-300 ease-bounce cursor-default 
      hover:z-50`}
    >
      <div className="flex justify-between items-center px-2 py-1">
        <p className="w-full whitespace-nowrap text-ellipsis overflow-hidden">
          {options[selected]}
        </p>
        <div className="relative">
          <Square
            className="stroke-1 stroke-transparent group-hover/drop:stroke-(--color-text) 
              transition-all duration-300 ease-bounce shrink-0"
          />
          <ChevronLeft
            className="absolute top-0 left-0 group-hover/drop:-rotate-90 
              transition-transform duration-300 ease-bounce"
          />
        </div>
      </div>
      <div
        className="absolute bg-inherit w-full py-1 scale-y-0 scale-x-90 rounded-b-md 
          group-hover/drop:scale-y-100 group-hover/drop:scale-x-100 flex flex-col 
          origin-top transition-transform duration-300 ease-bounce"
      >
        {Object.entries(options).map(([opt, text]) => {
          return (
            <div
              key={opt}
              className={`flex cursor-pointer py-1 px-2 overflow-hidden justify-between 
                hover:bg-(--color-overlay-1)
                ${selected == opt && "bg-(--color-overlay-1)"}`}
              onClick={() => setSelected(opt)}
            >
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                {text}
              </p>
              {selected == opt && <Check className="shrink-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
