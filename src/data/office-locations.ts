import { latLngToMapPercent } from '@/src/lib/india-map-geo';
import { COMPANY } from '@/src/data/company';

export type OfficeLocation = {
  id: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  /** Marker position on the dot map (% of container). */
  mapX: number;
  mapY: number;
  order: number;
  quote: string;
  headline: string;
};

type OfficeSeed = Omit<OfficeLocation, 'mapX' | 'mapY'> & {
  mapX?: number;
  mapY?: number;
};

function withMapPosition(office: OfficeSeed): OfficeLocation {
  const geo = latLngToMapPercent(office.lat, office.lng);
  return {
    ...office,
    mapX: office.mapX ?? geo.mapX,
    mapY: office.mapY ?? geo.mapY,
  };
}

/** OneCapital regional offices across Maharashtra. */
const OFFICE_SEEDS: OfficeSeed[] = [
  {
    id: 'mumbai',
    city: 'Mumbai',
    region: 'Maharashtra',
    lat: 19.076,
    lng: 72.8777,
    mapX: 18,
    mapY: 60,
    order: 2,
    quote:
      'Our Mumbai desk connects clients to OneCapital’s advisory network — mutual funds, portfolio management, and wealth planning with a clear local cadence.',
    headline: 'Mumbai Advisory Office',
  },
  {
    id: 'pune',
    city: COMPANY.hqCity,
    region: COMPANY.hqRegion,
    lat: 18.5515,
    lng: 73.947,
    mapX: 24.5,
    mapY: 62.5,
    order: 1,
    quote:
      'Pune headquarters at World Trade Centre, Tower 1, West Kharadi — delivering investment advisory, portfolio management, and long-term wealth planning with a client-first approach.',
    headline: 'Pune Headquarters',
  },
  {
    id: 'kolhapur',
    city: 'Kolhapur',
    region: 'Maharashtra',
    lat: 16.6913,
    lng: 74.2449,
    mapX: 26.5,
    mapY: 70,
    order: 3,
    quote:
      'From Kolhapur, we support families and businesses with structured wealth planning and disciplined portfolio conversations.',
    headline: 'Kolhapur Advisory Office',
  },
  {
    id: 'nashik',
    city: 'Nashik',
    region: 'Maharashtra',
    lat: 19.9975,
    lng: 73.7898,
    mapX: 26,
    mapY: 55,
    order: 4,
    quote:
      'Our Nashik office extends OneCapital’s advisory reach to clients who value clarity, cadence, and considered counsel.',
    headline: 'Nashik Advisory Office',
  },
];

export const OFFICE_LOCATIONS: OfficeLocation[] =
  OFFICE_SEEDS.map(withMapPosition);

export type PresenceStat = {
  id: string;
  value: string;
  label: string;
};

export const PRESENCE_STATS: PresenceStat[] = [
  {
    id: 'offices',
    value: String(OFFICE_LOCATIONS.length),
    label: 'Regional advisory offices across Maharashtra',
  },
  {
    id: 'founded',
    value: String(COMPANY.foundedYear),
    label: 'Year founded — Pune headquarters',
  },
  {
    id: 'focus',
    value: String(COMPANY.focusAreas.length),
    label: 'Core mandates: advisory, portfolios, wealth planning',
  },
  {
    id: 'services',
    value: `${COMPANY.serviceLines.length}+`,
    label: 'Service lines spanning funds, planning, and alternatives',
  },
];
