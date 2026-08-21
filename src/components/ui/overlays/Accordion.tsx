import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/src/lib/utils';

export type AccordionItem = {
  id?: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
};

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className={cn('flex flex-col border-t border-white/10', className)}>
      {items.map((item, i) => {
        const key = item.id ?? `${baseId}-${i}`;
        const isOpen = open.has(key);
        const panelId = `${key}-panel`;
        const buttonId = `${key}-button`;

        return (
          <div key={key} className="border-b border-white/10">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full flex items-center justify-between gap-6 py-6 text-left text-lg md:text-xl font-medium tracking-tight hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                onClick={() => toggle(key)}
              >
                <span>{item.title}</span>
                <span
                  aria-hidden
                  className={cn(
                    'text-white/40 text-2xl leading-none transition-transform duration-300',
                    isOpen && 'rotate-45'
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                'pb-6 text-text-muted leading-relaxed max-w-3xl',
                !isOpen && 'hidden'
              )}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
