import { COMPANY } from '@/src/data/company';

export type RiskFactorLink = {
  id: string;
  label: string;
  href: string;
};

export const HOME_RISK_FACTORS = {
  title: 'Risk Factors',

  disclosure:
    'All investments in securities and mutual funds are associated with market risks. Please read all scheme-related documents carefully before investing. Past performance does not guarantee future results. Exit loads, expense ratios, and other product charges may apply. Website content is general information only and does not constitute personalized investment advice.',

  advisoryNote:
    'OneCapital provides investment advisory and wealth-planning services under agreed terms. We do not guarantee returns or capital protection.',

  statutoryLine:
    'Investments in securities markets are subject to market risks. Read all related documents carefully before investing.',

  amfiLine: `AMFI Registered Mutual Fund Distributor — ARN-${COMPANY.amfiArn}. Validity: ${COMPANY.amfiValidity}.`,

  apmiLine: `APMI Registration No. — ${COMPANY.apmiRegistrationNo}. Validity: ${COMPANY.apmiValidity}.`,

  gstLine: `GSTIN — ${COMPANY.gstin}.`,

  cinLine: `CIN — ${COMPANY.cin}.`,

  regulatoryNote:
    'Any registration granted by SEBI, certification from NISM, and BASL enlistment, if applicable, do not guarantee intermediary performance or investor returns.',

  odrLink: {
    id: 'odr',
    label: 'https://smartodr.in',
    href: 'https://smartodr.in/',
  } satisfies RiskFactorLink,
} as const;
