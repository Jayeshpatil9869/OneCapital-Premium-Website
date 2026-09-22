import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const labelClassName =
  'text-[11px] uppercase tracking-widest font-mono text-white/50 ml-1';

const fieldClassName =
  'w-full min-h-12 bg-white/[0.03] border border-white/10 rounded-xl px-3.5 py-3.5 text-base text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 focus:bg-white/[0.05] transition-all sm:min-h-0 sm:px-4 sm:text-sm';

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

export type SelectOptionItem = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

export type SelectFieldProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'id' | 'onChange'
> & {
  id: string;
  label: string;
  wrapperClassName?: string;
  placeholder?: string;
  options?: SelectOptionItem[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
};

export function SelectField({
  id,
  label,
  name,
  className,
  wrapperClassName,
  placeholder = 'Select an option',
  options: optionsProp,
  defaultValue,
  value: controlledValue,
  onChange,
  onValueChange,
  required,
  disabled,
  children,
}: SelectFieldProps) {
  // Parse options either from `options` prop or from `<option>` children
  const parsedOptions: SelectOptionItem[] = [];
  let defaultPlaceholder = placeholder;

  if (optionsProp && optionsProp.length > 0) {
    parsedOptions.push(...optionsProp);
  } else if (children) {
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        const props = child.props as {
          value?: string;
          children?: ReactNode;
          disabled?: boolean;
        };
        const val = props.value !== undefined ? String(props.value) : '';
        const optLabel = typeof props.children === 'string' ? props.children : val;
        
        if (val === '' && props.disabled) {
          defaultPlaceholder = optLabel || defaultPlaceholder;
        } else {
          parsedOptions.push({
            value: val,
            label: optLabel,
            disabled: props.disabled,
          });
        }
      }
    });
  }

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<string>(() => {
    if (defaultValue !== undefined) return String(defaultValue);
    return '';
  });
  
  const selectedValue = isControlled ? String(controlledValue) : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nativeSelectRef = useRef<HTMLSelectElement>(null);
  const listboxId = useId();

  // Find currently selected option
  const selectedOption = parsedOptions.find((opt) => opt.value === selectedValue);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle value selection
  const handleSelect = useCallback(
    (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onValueChange?.(value);

      if (nativeSelectRef.current) {
        nativeSelectRef.current.value = value;
        // Dispatch synthetic change event to trigger form change listeners if any
        const syntheticEvent = {
          target: nativeSelectRef.current,
          currentTarget: nativeSelectRef.current,
        } as ChangeEvent<HTMLSelectElement>;
        onChange?.(syntheticEvent);
      }

      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [isControlled, onChange, onValueChange]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        const currentIndex = parsedOptions.findIndex((opt) => opt.value === selectedValue);
        setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev < parsedOptions.length - 1 ? prev + 1 : 0;
          return next;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : parsedOptions.length - 1;
          return next;
        });
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < parsedOptions.length) {
          const opt = parsedOptions[focusedIndex];
          if (!opt.disabled) {
            handleSelect(opt.value);
          }
        }
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <Field id={id} label={label} className={wrapperClassName}>
      <div ref={containerRef} className="relative w-full">
        {/* Hidden native select for HTML5 validation and standard form submission */}
        <select
          ref={nativeSelectRef}
          id={id}
          name={name}
          value={selectedValue}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-0 h-0 w-0 -z-10"
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value);
            onChange?.(e);
          }}
          onInvalid={() => {
            triggerRef.current?.focus();
          }}
        >
          <option value="" disabled>
            {defaultPlaceholder}
          </option>
          {parsedOptions.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Luxury Trigger Button */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setIsOpen((prev) => !prev);
              const currentIndex = parsedOptions.findIndex((opt) => opt.value === selectedValue);
              setFocusedIndex(currentIndex >= 0 ? currentIndex : 0);
            }
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            'group relative flex w-full items-center justify-between gap-3 text-left transition-all duration-200 cursor-pointer select-none',
            fieldClassName,
            isOpen && 'ring-1 ring-white/30 border-white/30 bg-white/[0.06] shadow-[0_0_20px_rgba(255,255,255,0.03)]',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <span
            className={cn(
              'truncate font-normal transition-colors',
              selectedOption ? 'text-white' : 'text-white/40'
            )}
          >
            {selectedOption ? selectedOption.label : defaultPlaceholder}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 text-white/40 group-hover:text-white/70 transition-colors"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.div>
        </button>

        {/* Animated Custom Luxury Floating Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={listboxId}
              role="listbox"
              aria-label={label}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-white/15 bg-[#080808]/95 p-1.5 shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.05)] backdrop-blur-2xl"
            >
              <div className="custom-scrollbar max-h-[min(15rem,50svh)] space-y-0.5 overflow-y-auto overscroll-contain">
                {parsedOptions.map((option, index) => {
                  const isSelected = option.value === selectedValue;
                  const isFocused = index === focusedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      disabled={option.disabled}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={cn(
                        'group/item relative flex min-h-11 w-full items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm transition-all duration-150 cursor-pointer',
                        isSelected
                          ? 'bg-white/[0.08] text-white font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
                          : 'text-white/70 hover:text-white hover:bg-white/[0.05]',
                        isFocused && !isSelected && 'bg-white/[0.04] text-white',
                        option.disabled && 'opacity-40 cursor-not-allowed'
                      )}
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="break-words">{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-white/40 group-hover/item:text-white/60 transition-colors">
                            {option.description}
                          </span>
                        )}
                      </div>

                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.15 }}
                          className="shrink-0 text-white"
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Field>
  );
}

