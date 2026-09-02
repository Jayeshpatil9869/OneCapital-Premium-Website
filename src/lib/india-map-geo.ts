/**
 * Geographic bounds + insets calibrated for `/images/india-dot-map.png`.
 * Converts WGS84 coordinates to percentage positions on the dot map.
 */
const INDIA_DOT_MAP_GEO = {
  latMin: 6.2,
  latMax: 37.8,
  lngMin: 67.8,
  lngMax: 97.8,
  insetLeft: 13.5,
  insetTop: 5.5,
  insetRight: 12.5,
  insetBottom: 8.5,
} as const;

export function latLngToMapPercent(lat: number, lng: number) {
  const plotWidth =
    100 - INDIA_DOT_MAP_GEO.insetLeft - INDIA_DOT_MAP_GEO.insetRight;
  const plotHeight =
    100 - INDIA_DOT_MAP_GEO.insetTop - INDIA_DOT_MAP_GEO.insetBottom;

  const mapX =
    INDIA_DOT_MAP_GEO.insetLeft +
    ((lng - INDIA_DOT_MAP_GEO.lngMin) /
      (INDIA_DOT_MAP_GEO.lngMax - INDIA_DOT_MAP_GEO.lngMin)) *
      plotWidth;

  const mapY =
    INDIA_DOT_MAP_GEO.insetTop +
    ((INDIA_DOT_MAP_GEO.latMax - lat) /
      (INDIA_DOT_MAP_GEO.latMax - INDIA_DOT_MAP_GEO.latMin)) *
      plotHeight;

  return {
    mapX: Math.round(mapX * 10) / 10,
    mapY: Math.round(mapY * 10) / 10,
  };
}
