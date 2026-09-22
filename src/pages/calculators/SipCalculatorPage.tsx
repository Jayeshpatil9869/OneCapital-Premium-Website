import { useEffect, useMemo, useState } from 'react';
import { CalculatorShell } from '@/src/components/calculators/CalculatorShell';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { CalculatorModeToggle } from '@/src/components/calculators/CalculatorModeToggle';
import { GrowthChart } from '@/src/components/calculators/GrowthChart';
import { COMPANY } from '@/src/data/company';
import { CALCULATOR_LIMITS } from '@/src/data/calculators';
import { calcSip, sipYearlySeries } from '@/src/lib/calculator-math';
import { cn } from '@/src/lib/utils';

function RateRiskHint({ rate }: { rate: number }) {
  const band = rate < 10 ? 'low' : rate < 14 ? 'balanced' : 'high';
  return (
    <div className="flex flex-wrap gap-3 pt-1 text-[11px] uppercase tracking-wider">
      <span className={cn(band === 'low' ? 'text-white' : 'text-white/35')}>Low risk</span>
      <span className={cn(band === 'balanced' ? 'text-white' : 'text-white/35')}>Balanced</span>
      <span className={cn(band === 'high' ? 'text-white' : 'text-white/35')}>High risk</span>
    </div>
  );
}

export default function SipCalculatorPage() {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const limits = CALCULATOR_LIMITS.sip;

  useEffect(() => {
    document.title = `SIP Calculator | ${COMPANY.brandName}`;
  }, []);

  const result = useMemo(
    () => calcSip({ monthlyInvestment: monthly, annualRate: rate, years }),
    [monthly, rate, years],
  );
  const series = useMemo(
    () => sipYearlySeries({ monthlyInvestment: monthly, annualRate: rate, years }),
    [monthly, rate, years],
  );

  return (
    <CalculatorShell
      slug="sip"
      title="SIP Calculator"
      subtitle="Model monthly investments with an assumed annual return — invested amount, estimated gains, and projected corpus."
      modeToggle={<CalculatorModeToggle active="monthly" />}
      controls={
        <>
          <CalculatorSlider
            id="sip-monthly"
            label="Monthly investment"
            value={monthly}
            min={limits.monthly.min}
            max={limits.monthly.max}
            step={limits.monthly.step}
            prefix="₹ "
            onChange={setMonthly}
          />
          <CalculatorSlider
            id="sip-years"
            label="Investment period"
            value={years}
            min={limits.years.min}
            max={limits.years.max}
            step={limits.years.step}
            suffix="Yr"
            onChange={setYears}
          />
          <div className="flex flex-col gap-2">
            <CalculatorSlider
              id="sip-rate"
              label="Expected rate of return"
              value={rate}
              min={limits.rate.min}
              max={limits.rate.max}
              step={limits.rate.step}
              suffix="%"
              onChange={setRate}
            />
            <RateRiskHint rate={rate} />
          </div>
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
      chart={<GrowthChart points={series} mode="line" />}
      breakdown={{
        invested: result.invested,
        returns: result.returns,
      }}
      infoSections={[
        {
          id: 'what',
          title: 'What is an SIP calculator?',
          paragraphs: [
            'A Systematic Investment Plan (SIP) calculator estimates how monthly investments may grow over time at an assumed rate of return. It helps you compare contribution size, tenure, and expected compounding — without promising actual market outcomes.',
          ],
        },
        {
          id: 'how',
          title: 'How this SIP calculator works',
          paragraphs: [
            'Enter your monthly investment, expected annual return, and time horizon. The tool compounds contributions monthly and shows invested capital versus estimated gains year by year.',
          ],
          bullets: [
            'Total investment = monthly amount × number of months',
            'Projected value uses standard future-value compounding for recurring contributions',
            'Estimated returns = projected value − total investment',
          ],
        },
      ]}
      faqs={[
        {
          id: 'faq-1',
          question: 'Are SIP calculator results guaranteed?',
          answer:
            'No. Results are illustrative only and depend on the return rate you assume. Actual mutual fund or portfolio returns can be higher or lower.',
        },
        {
          id: 'faq-2',
          question: 'Should I use expected returns from past performance?',
          answer:
            'Past performance does not guarantee future results. Use conservative assumptions and review product documents before investing.',
        },
      ]}
    />
  );
}
