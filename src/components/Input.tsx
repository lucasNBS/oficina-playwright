import type { ComponentPropsWithRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  id: string;
  label: string;
  error?: string;
};

export function Input({
  id,
  label,
  error,
  className,
  ...inputProps
}: InputProps) {
  const errorId = error ? `${id}-erro` : undefined;
  const describedBy =
    [inputProps["aria-describedby"], errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
        aria-describedby={describedBy}
        className={`mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-600 aria-invalid:focus:ring-red-100 ${className ?? ""}`.trim()}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
