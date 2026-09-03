import { latLngToMapPercent } from '@/src/lib/india-map-geo';

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
      'Our Mumbai capital desk anchors OneCapital’s institutional network, connecting global insights with tailored wealth strategies.',
    headline: 'Mumbai Advisory Office',
  },
  {
    id: 'pune',
    city: 'Pune',
    region: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    mapX: 24,
    mapY: 63,
    order: 1,
    quote:
      'The Pune desk brings institutional discipline with the accessibility of a dedicated local advisory team.',
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
      'From Kolhapur, we support families and principals with structured wealth planning rooted in long-term continuity.',
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
      'Our Nashik office extends OneCapital’s mandate to principals who value clarity, cadence, and considered counsel.',
    headline: 'Nashik Advisory Office',
  },
];

/** OneCapital office locations — positions calibrated for real geography on India dot map. */
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
    value: '4',
    label: 'Regional advisory offices across Maharashtra',
  },
  {
    id: 'retention',
    value: '98%',
    label: 'Client retention across mandates',
  },
  {
    id: 'team',
    value: '25+',
    label: 'Specialists across wealth & asset management',
  },
  {
    id: 'experience',
    value: '15 Yrs',
    label: 'Institutional market experience',
  },
];
