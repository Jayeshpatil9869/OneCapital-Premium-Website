import { useEffect, useMemo, useState } from 'react';
import { CalculatorShell } from '@/src/components/calculators/CalculatorShell';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { GrowthChart } from '@/src/components/calculators/GrowthChart';
import { COMPANY } from '@/src/data/company';
import { CALCULATOR_LIMITS } from '@/src/data/calculators';
import { calcStepUpSip, stepUpSipYearlySeries } from '@/src/lib/calculator-math';

export default function StepUpSipCalculatorPage() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);
  const limits = CALCULATOR_LIMITS.stepUpSip;

  useEffect(() => {
    document.title = `Step Up SIP Calculator | ${COMPANY.brandName}`;
  }, []);

  const result = useMemo(
    () =>
      calcStepUpSip({
        monthlyInvestment: monthly,
        annualRate: rate,
        years,
        stepUpPercent: stepUp,
      }),
    [monthly, rate, years, stepUp],
  );
  const series = useMemo(
    () =>
      stepUpSipYearlySeries({
        monthlyInvestment: monthly,
        annualRate: rate,
        years,
        stepUpPercent: stepUp,
      }),
    [monthly, rate, years, stepUp],
  );

  return (
    <CalculatorShell
      slug="step-up-sip"
      title="Step Up SIP"
      subtitle="See how increasing your SIP each year can change invested capital and projected corpus versus a flat SIP."
      controls={
        <>
          <CalculatorSlider
            id="step-monthly"
            label="Starting monthly investment"
            value={monthly}
            min={limits.monthly.min}
            max={limits.monthly.max}
            step={limits.monthly.step}
            onChange={setMonthly}
          />
          <CalculatorSlider
            id="step-rate"
            label="Expected return rate (p.a.)"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
          <CalculatorSlider
            id="step-up"
            label="Annual step-up"
            value={stepUp}
            min={limits.stepUp.min}
            max={limits.stepUp.max}
            step={limits.stepUp.step}
            suffix="%"
            onChange={setStepUp}
          />
          <CalculatorSlider
            id="step-years"
            label="Time period"
            value={years}
            min={limits.years.min}
            max={limits.years.max}
            step={limits.years.step}
            suffix="Yr"
            onChange={setYears}
          />
        </>
      }
      results={
        <CalculatorResults
          rows={[
            { id: 'invested', label: 'Total investment', value: result.invested, tone: 'muted' },
            { id: 'returns', label: 'Estimated returns', value: result.returns },
            {
              id: 'total',
              label: 'Projected value',
              value: result.futureValue,
              emphasize: true,
              tone: 'accent',
            },
          ]}
        />
      }
      chart={<GrowthChart points={series} mode="line" />}
      breakdown={{
        invested: result.invested,
        returns: result.returns,
      }}
      infoSections={[
        {
          id: 'what',
          title: 'What is a step-up SIP?',
          paragraphs: [
            'A step-up SIP increases your monthly contribution each year by a chosen percentage. This can help contributions keep pace with income growth while remaining disciplined.',
          ],
        },
        {
          id: 'how',
          title: 'How this calculator works',
          paragraphs: [
            'We start with your monthly SIP, compound monthly at the assumed return, then increase the SIP amount once per year by the step-up percentage you select.',
          ],
        },
      ]}
      faqs={[
        {
          id: 'faq-1',
          question: 'Can I set step-up to zero?',
          answer:
            'Yes. A 0% step-up behaves like a regular SIP with a constant monthly amount.',
        },
      ]}
    />
  );
}
