import { useEffect, useMemo, useState } from 'react';
import { CalculatorShell } from '@/src/components/calculators/CalculatorShell';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { GrowthChart } from '@/src/components/calculators/GrowthChart';
import { COMPANY } from '@/src/data/company';
import { CALCULATOR_LIMITS } from '@/src/data/calculators';
import { calcSwp, swpYearlySeries } from '@/src/lib/calculator-math';

export default function SwpCalculatorPage() {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(25000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(15);
  const limits = CALCULATOR_LIMITS.swp;

  useEffect(() => {
    document.title = `SWP Calculator | ${COMPANY.brandName}`;
  }, []);

  const result = useMemo(
    () =>
      calcSwp({
        corpus,
        monthlyWithdrawal: withdrawal,
        annualRate: rate,
        years,
      }),
    [corpus, withdrawal, rate, years],
  );
  const series = useMemo(
    () =>
      swpYearlySeries({
        corpus,
        monthlyWithdrawal: withdrawal,
        annualRate: rate,
        years,
      }),
    [corpus, withdrawal, rate, years],
  );

  return (
    <CalculatorShell
      slug="swp"
      title="SWP Calculator — Plan Systematic Withdrawals"
      subtitle="Estimate how monthly withdrawals may affect a starting corpus under an assumed return rate."
      controls={
        <>
          <CalculatorSlider
            id="swp-corpus"
            label="Starting corpus"
            value={corpus}
            min={limits.corpus.min}
            max={limits.corpus.max}
            step={limits.corpus.step}
            onChange={setCorpus}
          />
          <CalculatorSlider
            id="swp-withdrawal"
            label="Monthly withdrawal"
            value={withdrawal}
            min={limits.withdrawal.min}
            max={limits.withdrawal.max}
            step={limits.withdrawal.step}
            onChange={setWithdrawal}
          />
          <CalculatorSlider
            id="swp-rate"
            label="Expected return rate (p.a.)"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
          <CalculatorSlider
            id="swp-years"
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
            {
              id: 'start',
              label: 'Starting corpus',
              value: result.startingCorpus,
              tone: 'muted',
            },
            {
              id: 'withdrawn',
              label: 'Total withdrawn',
              value: result.totalWithdrawn,
            },
            {
              id: 'remain',
              label: result.depleted ? 'Corpus depleted' : 'Remaining corpus',
              value: result.remainingCorpus,
              emphasize: true,
              tone: 'accent',
            },
          ]}
        />
      }
      chart={
        <GrowthChart
          points={series}
          mode="swp"
          investedLabel="Remaining corpus"
          returnsLabel="Withdrawn (cum.)"
        />
      }
      breakdown={{
        invested: result.remainingCorpus,
        returns: result.totalWithdrawn,
        investedLabel: 'Remaining',
        returnsLabel: 'Withdrawn',
      }}
      infoSections={[
        {
          id: 'what',
          title: 'What is an SWP calculator?',
          paragraphs: [
            'A Systematic Withdrawal Plan (SWP) calculator helps you explore monthly income from an invested corpus while the balance continues to earn an assumed return.',
          ],
        },
        {
          id: 'how',
          title: 'How this SWP calculator works',
          paragraphs: [
            'Each month we grow the corpus by the assumed monthly return, then subtract the withdrawal. If the balance reaches zero before the selected tenure, the chart and summary reflect early depletion.',
          ],
        },
      ]}
      faqs={[
        {
          id: 'faq-1',
          question: 'What if my withdrawal is too high?',
          answer:
            'The corpus may deplete before the end of the selected period. Try lowering the withdrawal amount, increasing the starting corpus, or extending assumed returns cautiously.',
        },
      ]}
    />
  );
}
