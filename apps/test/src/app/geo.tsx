import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
// import * as topojson from 'topojson-client';
// import topology from './world-topo.json';
import geo from './geo.json'
export const background = '#f9f7e8';

export type GeoMercatorProps = {
  width: number;
  height: number;
  events?: boolean;
};

interface FeatureShape {
  // type: 'Feature';
  type: string;
  // id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { COUNTYID: string, COUNTYCODE: string, COUNTYNAME: string, COUNTYENG: string };
}

const color = scaleQuantize({
  domain: [
    Math.min(...geo.features.map((f) => f.geometry.coordinates.length)),
    Math.max(...geo.features.map((f) => f.geometry.coordinates.length)),
  ],
  range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48'],
});

export default function ({ width, height, events = false }: GeoMercatorProps) {
  const scale = (width / 800) * 100;
  // const scale = 2000;
  const centerX = width * 0.5;
  // const centerX = 600;
  console.log('centerX', centerX)
  const centerY = height * 0.5;
  // const centerY = 400;
  console.log('centerY', centerY)
  // console.log('scale', scale);


  return width < 10 ? null : (
    <svg width={width * 1} height={height * 1}>
      {/* <rect x={0} y={0} width={width} height={height} fill={background} rx={14} /> */}
      <Mercator<any>
        data={geo.features}
        scale={scale}
        center={[120.91763, 23.858987]}
        // translate={[centerX, centerY - 500]}
        clipExtent={[
          [118, 24],
          [122, 26],
        ]}
      >
        {(mercator) => (
          <g>
            {/* <Graticule graticule={(g) => mercator.path(g) || ''} stroke="rgba(33,33,33,0.05)" /> */}
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={`map-feature-${i}`}
                d={path || ''}
                // fill={color(feature.geometry.coordinates.length)}
                fill={'rgba(33,33,33,0.5)'}
                stroke={background}
                strokeWidth={2}
                onClick={() => {
                  if (events) console.log(`Clicked: ${feature.properties.COUNTYNAME} (${feature.properties.COUNTYCODE})`);
                }}
              />
            ))}
          </g>
        )}
      </Mercator>
    </svg>
  );
}
