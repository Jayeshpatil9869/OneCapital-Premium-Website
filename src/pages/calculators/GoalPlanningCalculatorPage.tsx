import { useEffect, useMemo, useState } from 'react';
import { CalculatorShell } from '@/src/components/calculators/CalculatorShell';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { GrowthChart } from '@/src/components/calculators/GrowthChart';
import { COMPANY } from '@/src/data/company';
import { CALCULATOR_LIMITS } from '@/src/data/calculators';
import { calcGoal, goalYearlySeries } from '@/src/lib/calculator-math';

export default function GoalPlanningCalculatorPage() {
  const [target, setTarget] = useState(5000000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const limits = CALCULATOR_LIMITS.goal;

  useEffect(() => {
    document.title = `Goal Planning Calculator | ${COMPANY.brandName}`;
  }, []);

  const result = useMemo(
    () => calcGoal({ targetAmount: target, annualRate: rate, years }),
    [target, rate, years],
  );
  const series = useMemo(
    () => goalYearlySeries({ targetAmount: target, annualRate: rate, years }),
    [target, rate, years],
  );

  return (
    <CalculatorShell
      slug="goal-planning"
      title="Financial Goal Planning — Required SIP & Lumpsum"
      subtitle="Start from a target amount and estimate the monthly SIP or lumpsum that could be needed at an assumed return rate."
      controls={
        <>
          <CalculatorSlider
            id="goal-target"
            label="Target amount"
            value={target}
            min={limits.target.min}
            max={limits.target.max}
            step={limits.target.step}
            onChange={setTarget}
          />
          <CalculatorSlider
            id="goal-rate"
            label="Expected return rate (p.a.)"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
          <CalculatorSlider
            id="goal-years"
            label="Time to goal"
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
          title="Required investment"
          rows={[
            {
              id: 'target',
              label: 'Goal amount',
              value: result.targetAmount,
              tone: 'muted',
            },
            {
              id: 'sip',
              label: 'Required monthly SIP',
              value: result.requiredSip,
              emphasize: true,
              tone: 'accent',
            },
            {
              id: 'lump',
              label: 'Required lumpsum today',
              value: result.requiredLumpsum,
            },
          ]}
        />
      }
      chart={
        <GrowthChart
          points={series}
          mode="line"
          investedLabel="SIP invested"
          returnsLabel="Est. gains to goal"
        />
      }
      breakdown={{
        invested: series.at(-1)?.invested ?? 0,
        returns: series.at(-1)?.returns ?? 0,
        investedLabel: 'SIP invested',
        returnsLabel: 'Est. gains',
      }}
      infoSections={[
        {
          id: 'what',
          title: 'What is financial goal planning?',
          paragraphs: [
            'Goal planning starts with a target corpus and works backward to estimate the SIP or lumpsum that may be required, given time and an assumed return rate.',
          ],
        },
        {
          id: 'how',
          title: 'How this calculator works',
          paragraphs: [
            'Required SIP is solved from the standard SIP future-value equation. Required lumpsum is the present value of the target discounted at the assumed annual rate.',
          ],
        },
      ]}
      faqs={[
        {
          id: 'faq-1',
          question: 'Does this include inflation?',
          answer:
            'Not explicitly. If your goal is in today’s rupees, consider increasing the target for expected inflation before running the estimate.',
        },
      ]}
    />
  );
}
