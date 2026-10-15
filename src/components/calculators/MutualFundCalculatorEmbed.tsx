import { useMemo, useState, type ReactNode } from 'react';
import { CalculatorSlider } from '@/src/components/calculators/CalculatorSlider';
import { CalculatorResults } from '@/src/components/calculators/CalculatorResults';
import { GrowthChart } from '@/src/components/calculators/GrowthChart';
import { AllocationDonut } from '@/src/components/calculators/AllocationDonut';
import { CALCULATOR_LIMITS } from '@/src/data/calculators';
import {
  calcGoal,
  calcLumpsum,
  calcSip,
  calcStepUpSip,
  goalYearlySeries,
  lumpsumYearlySeries,
  sipYearlySeries,
  stepUpSipYearlySeries,
} from '@/src/lib/calculator-math';
import { cn } from '@/src/lib/utils';

type EmbedKind = 'sip' | 'lumpsum' | 'step-up-sip' | 'goal-planning';

const OPTIONS: { id: EmbedKind; title: string }[] = [
  {
    id: 'sip',
    title: 'SIP Calculator',
  },
  {
    id: 'lumpsum',
    title: 'Lumpsum Calculator',
  },
  {
    id: 'step-up-sip',
    title: 'Step-Up SIP Calculator',
  },
  {
    id: 'goal-planning',
    title: 'Goal Planning Calculator',
  },
];

function Workspace({
  controls,
  results,
  chart,
  invested,
  returns,
  investedLabel,
  returnsLabel,
}: {
  controls: ReactNode;
  results: ReactNode;
  chart: ReactNode;
  invested: number;
  returns: number;
  investedLabel?: string;
  returnsLabel?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col gap-7 lg:col-span-5">{controls}</div>
      <div className="flex flex-col gap-6 lg:col-span-7">
        {results}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          <div className="xl:col-span-8">{chart}</div>
          <AllocationDonut
            className="xl:col-span-4"
            invested={invested}
            returns={returns}
            investedLabel={investedLabel}
            returnsLabel={returnsLabel}
          />
        </div>
      </div>
    </div>
  );
}

function SipPanel() {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const limits = CALCULATOR_LIMITS.sip;
  const input = { monthlyInvestment: monthly, annualRate: rate, years };
  const result = useMemo(() => calcSip(input), [monthly, rate, years]);
  const series = useMemo(() => sipYearlySeries(input), [monthly, rate, years]);
  const band = rate < 10 ? 'low' : rate < 14 ? 'balanced' : 'high';

  return (
    <Workspace
      invested={result.invested}
      returns={result.returns}
      controls={
        <>
          <CalculatorSlider
            id="mf-sip-monthly"
            label="Monthly investment"
            value={monthly}
            min={limits.monthly.min}
            max={limits.monthly.max}
            step={limits.monthly.step}
            prefix="₹ "
            onChange={setMonthly}
          />
          <CalculatorSlider
            id="mf-sip-years"
            label="Investment period"
            value={years}
            min={limits.years.min}
            max={limits.years.max}
            step={limits.years.step}
            suffix="Yr"
            onChange={setYears}
          />
          <CalculatorSlider
            id="mf-sip-rate"
            label="Expected rate of return"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
          <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wider">
            <span
              className={cn(
                'rounded-full px-3 py-1 border transition-colors',
                band === 'low'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 bg-white/[0.04] text-white/60',
              )}
            >
              Low risk
            </span>
            <span
              className={cn(
                'rounded-full px-3 py-1 border transition-colors',
                band === 'balanced'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 bg-white/[0.04] text-white/60',
              )}
            >
              Balanced
            </span>
            <span
              className={cn(
                'rounded-full px-3 py-1 border transition-colors',
                band === 'high'
                  ? 'border-white bg-white text-black font-semibold'
                  : 'border-white/15 bg-white/[0.04] text-white/60',
              )}
            >
              High risk
            </span>
          </div>
        </>
      }
      results={
        <CalculatorResults
          rows={[
            { id: 'total', label: 'Projected value', value: result.futureValue, emphasize: true, tone: 'accent' },
            { id: 'invested', label: 'Total invested', value: result.invested, tone: 'muted' },
            { id: 'returns', label: 'Estimated returns', value: result.returns },
          ]}
        />
      }
      chart={<GrowthChart points={series} mode="line" />}
    />
  );
}

function LumpsumPanel() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const limits = CALCULATOR_LIMITS.lumpsum;
  const input = { principal, annualRate: rate, years };
  const result = useMemo(() => calcLumpsum(input), [principal, rate, years]);
  const series = useMemo(() => lumpsumYearlySeries(input), [principal, rate, years]);

  return (
    <Workspace
      invested={result.invested}
      returns={result.returns}
      investedLabel="Principal"
      controls={
        <>
          <CalculatorSlider
            id="mf-lump-principal"
            label="Investment amount"
            value={principal}
            min={limits.principal.min}
            max={limits.principal.max}
            step={limits.principal.step}
            prefix="₹ "
            onChange={setPrincipal}
          />
          <CalculatorSlider
            id="mf-lump-years"
            label="Investment period"
            value={years}
            min={limits.years.min}
            max={limits.years.max}
            step={limits.years.step}
            suffix="Yr"
            onChange={setYears}
          />
          <CalculatorSlider
            id="mf-lump-rate"
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
            { id: 'total', label: 'Projected value', value: result.futureValue, emphasize: true, tone: 'accent' },
            { id: 'invested', label: 'Total invested', value: result.invested, tone: 'muted' },
            { id: 'returns', label: 'Estimated returns', value: result.returns },
          ]}
        />
      }
      chart={<GrowthChart points={series} investedLabel="Principal" mode="line" />}
    />
  );
}

function StepUpPanel() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);
  const limits = CALCULATOR_LIMITS.stepUpSip;
  const input = { monthlyInvestment: monthly, annualRate: rate, years, stepUpPercent: stepUp };
  const result = useMemo(() => calcStepUpSip(input), [monthly, rate, years, stepUp]);
  const series = useMemo(() => stepUpSipYearlySeries(input), [monthly, rate, years, stepUp]);

  return (
    <Workspace
      invested={result.invested}
      returns={result.returns}
      controls={
        <>
          <CalculatorSlider
            id="mf-step-monthly"
            label="Starting monthly investment"
            value={monthly}
            min={limits.monthly.min}
            max={limits.monthly.max}
            step={limits.monthly.step}
            prefix="₹ "
            onChange={setMonthly}
          />
          <CalculatorSlider
            id="mf-step-rate"
            label="Expected return rate (p.a.)"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
          <CalculatorSlider
            id="mf-step-up"
            label="Annual step-up"
            value={stepUp}
            min={limits.stepUp.min}
            max={limits.stepUp.max}
            step={limits.stepUp.step}
            suffix="%"
            onChange={setStepUp}
          />
          <CalculatorSlider
            id="mf-step-years"
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
            { id: 'total', label: 'Projected value', value: result.futureValue, emphasize: true, tone: 'accent' },
          ]}
        />
      }
      chart={<GrowthChart points={series} mode="line" />}
    />
  );
}

function GoalPanel() {
  const [target, setTarget] = useState(5000000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const limits = CALCULATOR_LIMITS.goal;
  const input = { targetAmount: target, annualRate: rate, years };
  const result = useMemo(() => calcGoal(input), [target, rate, years]);
  const series = useMemo(() => goalYearlySeries(input), [target, rate, years]);
  const last = series.at(-1);

  return (
    <Workspace
      invested={last?.invested ?? 0}
      returns={last?.returns ?? 0}
      investedLabel="SIP invested"
      returnsLabel="Est. gains"
      controls={
        <>
          <CalculatorSlider
            id="mf-goal-target"
            label="Target amount"
            value={target}
            min={limits.target.min}
            max={limits.target.max}
            step={limits.target.step}
            prefix="₹ "
            onChange={setTarget}
          />
          <CalculatorSlider
            id="mf-goal-rate"
            label="Expected return rate (p.a.)"
            value={rate}
            min={limits.rate.min}
            max={limits.rate.max}
            step={limits.rate.step}
            suffix="%"
            onChange={setRate}
          />
          <CalculatorSlider
            id="mf-goal-years"
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
            { id: 'target', label: 'Goal amount', value: result.targetAmount, tone: 'muted' },
            { id: 'sip', label: 'Required monthly SIP', value: result.requiredSip, emphasize: true, tone: 'accent' },
            { id: 'lump', label: 'Required lumpsum today', value: result.requiredLumpsum },
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
    />
  );
}

function ActivePanel({ kind }: { kind: EmbedKind }) {
  switch (kind) {
    case 'sip':
      return <SipPanel />;
    case 'lumpsum':
      return <LumpsumPanel />;
    case 'step-up-sip':
      return <StepUpPanel />;
    case 'goal-planning':
      return <GoalPanel />;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export function MutualFundCalculatorEmbed() {
  const [kind, setKind] = useState<EmbedKind>('sip');

  return (
    <div id="mutual-fund-calculator" className="mt-10 scroll-mt-28">
      <div role="tablist" aria-label="Mutual fund calculators" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OPTIONS.map((option) => {
          const selected = option.id === kind;
          return (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setKind(option.id)}
              className={cn(
                'rounded-2xl border px-5 py-4 text-center sm:text-left transition-all duration-200 shadow-sm',
                selected
                  ? 'border-white bg-white text-black font-semibold shadow-md'
                  : 'border-white/15 bg-[#1D1D1D] text-white/80 hover:border-white/35 hover:bg-[#262626] hover:text-white',
              )}
            >
              <span className="block font-sans text-base sm:text-lg font-semibold">{option.title}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        className="mt-6 rounded-3xl border border-white/10 bg-[#1D1D1D] p-6 sm:p-8 lg:p-10 text-white shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      >
        <ActivePanel key={kind} kind={kind} />
      </div>
    </div>
  );
}
