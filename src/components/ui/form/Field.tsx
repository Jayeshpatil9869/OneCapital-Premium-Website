import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const labelClassName =
  'text-[11px] uppercase tracking-widest font-mono text-white/50 ml-1';

const fieldClassName =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/[0.05] transition-all';

type FieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function Field({ id, label, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {children}
    </div>
  );
}

type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string;
  label: string;
  wrapperClassName?: string;
};

export function InputField({
  id,
  label,
  className,
  wrapperClassName,
  ...props
}: InputFieldProps) {
  return (
    <Field id={id} label={label} className={wrapperClassName}>
      <input id={id} className={cn(fieldClassName, className)} {...props} />
    </Field>
  );
}

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  id: string;
  label: string;
  wrapperClassName?: string;
};

export function TextareaField({
  id,
  label,
  className,
  wrapperClassName,
  ...props
}: TextareaFieldProps) {
  return (
    <Field id={id} label={label} className={wrapperClassName}>
      <textarea
        id={id}
        className={cn(fieldClassName, 'resize-none', className)}
        {...props}
      />
    </Field>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  id: string;
  label: string;
  wrapperClassName?: string;
  children: ReactNode;
};

export function SelectField({
  id,
  label,
  className,
  wrapperClassName,
  children,
  ...props
}: SelectFieldProps) {
  return (
    <Field id={id} label={label} className={wrapperClassName}>
      <div className="relative">
        <select
          id={id}
          className={cn(
            fieldClassName,
            'appearance-none cursor-pointer pr-10',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
          aria-hidden
        />
      </div>
    </Field>
  );
}
