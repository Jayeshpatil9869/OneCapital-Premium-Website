import { useEffect, useMemo, useState } from 'react';
import { CalculatorShell } from '@/src/components/calculators/CalculatorShell';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { CalculatorModeToggle } from '@/src/components/calculators/CalculatorModeToggle';
import { GrowthChart } from '@/src/components/calculators/GrowthChart';
import { COMPANY } from '@/src/data/company';
import { CALCULATOR_LIMITS } from '@/src/data/calculators';
import { calcLumpsum, lumpsumYearlySeries } from '@/src/lib/calculator-math';

export default function LumpsumCalculatorPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const limits = CALCULATOR_LIMITS.lumpsum;

  useEffect(() => {
    document.title = `Lumpsum Calculator | ${COMPANY.brandName}`;
  }, []);

  const result = useMemo(
    () => calcLumpsum({ principal, annualRate: rate, years }),
    [principal, rate, years],
  );
  const series = useMemo(
    () => lumpsumYearlySeries({ principal, annualRate: rate, years }),
    [principal, rate, years],
  );

  return (
    <CalculatorShell
      slug="lumpsum"
      title="Lumpsum Calculator"
      subtitle="Estimate how a one-time investment may compound over your chosen horizon at an assumed annual return."
      modeToggle={<CalculatorModeToggle active="lumpsum" />}
      controls={
        <>
          <CalculatorSlider
            id="lump-principal"
            label="Investment amount"
            value={principal}
            min={limits.principal.min}
            max={limits.principal.max}
            step={limits.principal.step}
            prefix="₹ "
            onChange={setPrincipal}
          />
          <CalculatorSlider
            id="lump-years"
            label="Investment period"
            value={years}
            min={limits.years.min}
            max={limits.years.max}
            step={limits.years.step}
            suffix="Yr"
            onChange={setYears}
          />
          <CalculatorSlider
            id="lump-rate"
            label="Expected rate of return"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
        </>
      }
      results={
        <CalculatorResults
          rows={[
            {
              id: 'total',
              label: 'Projected value',
              value: result.futureValue,
              emphasize: true,
              tone: 'accent',
            },
            { id: 'invested', label: 'Total invested', value: result.invested, tone: 'muted' },
            { id: 'returns', label: 'Estimated returns', value: result.returns },
          ]}
        />
      }
      chart={<GrowthChart points={series} investedLabel="Principal" mode="line" />}
      breakdown={{
        invested: result.invested,
        returns: result.returns,
        investedLabel: 'Principal',
      }}
      infoSections={[
        {
          id: 'what',
          title: 'What is a lumpsum calculator?',
          paragraphs: [
            'A lumpsum calculator estimates the future value of a one-time investment compounded at an assumed annual rate. It is useful when comparing a single deployment versus spreading investments through SIPs.',
          ],
        },
        {
          id: 'how',
          title: 'How this lumpsum calculator works',
          paragraphs: [
            'Projected value = principal × (1 + annual rate)^years. Estimated returns are the difference between projected value and the amount invested.',
          ],
        },
      ]}
      faqs={[
        {
          id: 'faq-1',
          question: 'Is lumpsum better than SIP?',
          answer:
            'It depends on cash flow, market timing comfort, and goals. SIPs spread purchases over time; lumpsum deploys capital immediately. This tool does not recommend either approach.',
        },
      ]}
    />
  );
}
