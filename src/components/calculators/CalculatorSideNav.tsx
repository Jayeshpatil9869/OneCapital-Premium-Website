import { useNavigate } from 'react-router-dom';
import { SelectField } from '@/src/components/ui';
import { CALCULATOR_CARDS, type CalculatorSlug } from '@/src/data/calculators';
import { cn } from '@/src/lib/utils';

type CalculatorSideNavProps = {
  active: CalculatorSlug;
  className?: string;
};

export function CalculatorSideNav({ active, className }: CalculatorSideNavProps) {
  const navigate = useNavigate();

  return (
    <div className={cn('w-full max-w-xs lg:w-72', className)}>
      <SelectField
        id="calculator-switcher"
        label="Calculators"
        name="calculator"
        value={active}
        options={CALCULATOR_CARDS.map((card) => ({
          value: card.slug,
          label: card.shortTitle,
        }))}
        onValueChange={(value) => {
          const next = CALCULATOR_CARDS.find((card) => card.slug === value);
          if (!next || next.slug === active) return;
          navigate(next.path);
        }}
      />
    </div>
  );
}
