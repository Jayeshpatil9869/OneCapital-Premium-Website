export type YearlyPoint = {
  year: number;
  invested: number;
  value: number;
  returns: number;
};

export type SipInput = {
  monthlyInvestment: number;
  annualRate: number;
  years: number;
};

export type LumpsumInput = {
  principal: number;
  annualRate: number;
  years: number;
};

export type StepUpSipInput = SipInput & {
  stepUpPercent: number;
};

export type SwpInput = {
  corpus: number;
  monthlyWithdrawal: number;
  annualRate: number;
  years: number;
};

export type GoalInput = {
  targetAmount: number;
  annualRate: number;
  years: number;
};

function monthlyRate(annualRate: number): number {
  return annualRate / 12 / 100;
}

/** Future value of a monthly SIP (end-of-month contribution). */
export function calcSip({ monthlyInvestment, annualRate, years }: SipInput) {
  const r = monthlyRate(annualRate);
  const n = Math.max(0, Math.round(years * 12));
  const P = Math.max(0, monthlyInvestment);

  let futureValue = 0;
  if (r === 0) {
    futureValue = P * n;
  } else {
    futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }

  const invested = P * n;
  const returns = Math.max(0, futureValue - invested);

  return { invested, returns, futureValue, months: n };
}

export function sipYearlySeries(input: SipInput): YearlyPoint[] {
  const r = monthlyRate(input.annualRate);
  const P = Math.max(0, input.monthlyInvestment);
  const years = Math.max(1, Math.round(input.years));
  const points: YearlyPoint[] = [];

  let value = 0;
  let invested = 0;

  for (let y = 1; y <= years; y += 1) {
    for (let m = 0; m < 12; m += 1) {
      invested += P;
      value = (value + P) * (1 + r);
    }
    points.push({
      year: y,
      invested,
      value,
      returns: Math.max(0, value - invested),
    });
  }

  return points;
}

export function calcLumpsum({ principal, annualRate, years }: LumpsumInput) {
  const P = Math.max(0, principal);
  const y = Math.max(0, years);
  const futureValue = P * Math.pow(1 + annualRate / 100, y);
  const invested = P;
  const returns = Math.max(0, futureValue - invested);
  return { invested, returns, futureValue };
}

export function lumpsumYearlySeries(input: LumpsumInput): YearlyPoint[] {
  const years = Math.max(1, Math.round(input.years));
  const P = Math.max(0, input.principal);
  const points: YearlyPoint[] = [];

  for (let y = 1; y <= years; y += 1) {
    const value = P * Math.pow(1 + input.annualRate / 100, y);
    points.push({
      year: y,
      invested: P,
      value,
      returns: Math.max(0, value - P),
    });
  }

  return points;
}

/** SIP with annual step-up applied at the start of each new year. */
export function calcStepUpSip({
  monthlyInvestment,
  annualRate,
  years,
  stepUpPercent,
}: StepUpSipInput) {
  const r = monthlyRate(annualRate);
  const yearsSafe = Math.max(0, Math.round(years));
  const step = Math.max(0, stepUpPercent) / 100;

  let value = 0;
  let invested = 0;
  let monthly = Math.max(0, monthlyInvestment);

  for (let y = 0; y < yearsSafe; y += 1) {
    for (let m = 0; m < 12; m += 1) {
      invested += monthly;
      value = (value + monthly) * (1 + r);
    }
    monthly *= 1 + step;
  }

  return {
    invested,
    returns: Math.max(0, value - invested),
    futureValue: value,
  };
}

export function stepUpSipYearlySeries(input: StepUpSipInput): YearlyPoint[] {
  const r = monthlyRate(input.annualRate);
  const years = Math.max(1, Math.round(input.years));
  const step = Math.max(0, input.stepUpPercent) / 100;
  const points: YearlyPoint[] = [];

  let value = 0;
  let invested = 0;
  let monthly = Math.max(0, input.monthlyInvestment);

  for (let y = 1; y <= years; y += 1) {
    for (let m = 0; m < 12; m += 1) {
      invested += monthly;
      value = (value + monthly) * (1 + r);
    }
    points.push({
      year: y,
      invested,
      value,
      returns: Math.max(0, value - invested),
    });
    monthly *= 1 + step;
  }

  return points;
}

export function calcSwp({
  corpus,
  monthlyWithdrawal,
  annualRate,
  years,
}: SwpInput) {
  const r = monthlyRate(annualRate);
  const n = Math.max(0, Math.round(years * 12));
  const W = Math.max(0, monthlyWithdrawal);

  let balance = Math.max(0, corpus);
  let totalWithdrawn = 0;
  let monthsLasted = 0;

  for (let i = 0; i < n; i += 1) {
    balance = balance * (1 + r) - W;
    if (balance < 0) {
      totalWithdrawn += Math.max(0, W + balance);
      balance = 0;
      monthsLasted = i + 1;
      break;
    }
    totalWithdrawn += W;
    monthsLasted = i + 1;
  }

  return {
    startingCorpus: Math.max(0, corpus),
    totalWithdrawn,
    remainingCorpus: balance,
    monthsLasted,
    yearsLasted: monthsLasted / 12,
    depleted: balance <= 0 && monthsLasted < n,
  };
}

export function swpYearlySeries(input: SwpInput): YearlyPoint[] {
  const r = monthlyRate(input.annualRate);
  const years = Math.max(1, Math.round(input.years));
  const W = Math.max(0, input.monthlyWithdrawal);
  const points: YearlyPoint[] = [];

  let balance = Math.max(0, input.corpus);
  let withdrawn = 0;

  for (let y = 1; y <= years; y += 1) {
    for (let m = 0; m < 12; m += 1) {
      balance = balance * (1 + r) - W;
      if (balance < 0) {
        withdrawn += Math.max(0, W + balance);
        balance = 0;
      } else {
        withdrawn += W;
      }
    }
    points.push({
      year: y,
      invested: Math.max(0, input.corpus),
      value: balance,
      returns: withdrawn,
    });
    if (balance <= 0) break;
  }

  return points;
}

export function calcGoal({ targetAmount, annualRate, years }: GoalInput) {
  const r = monthlyRate(annualRate);
  const n = Math.max(0, Math.round(years * 12));
  const FV = Math.max(0, targetAmount);

  let requiredSip = 0;
  if (n === 0) {
    requiredSip = FV;
  } else if (r === 0) {
    requiredSip = FV / n;
  } else {
    requiredSip = FV / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  }

  const requiredLumpsum =
    years <= 0 ? FV : FV / Math.pow(1 + annualRate / 100, years);

  return { requiredSip, requiredLumpsum, targetAmount: FV };
}

export function goalYearlySeries(input: GoalInput): YearlyPoint[] {
  const { requiredSip } = calcGoal(input);
  return sipYearlySeries({
    monthlyInvestment: requiredSip,
    annualRate: input.annualRate,
    years: input.years,
  });
}
