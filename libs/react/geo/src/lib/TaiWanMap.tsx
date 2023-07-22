// import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
import { Zoom } from "@visx/zoom";
import * as topojson from 'topojson-client';
// import topology from './geo_topo.json';
import topology from './geo3.json';
export const background = '#f9f7e8';

export type GeoMercatorProps = {
  width: number;
  height: number;
  events?: boolean;
};

interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { COUNTYID: string, COUNTYCODE: string, COUNTYNAME: string, COUNTYENG: string };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const world = topojson.feature(topology, topology.objects.layer1) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const color = scaleQuantize({
  domain: [
    Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
    Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
  ],
  range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48'],
});

export function TaiWanMap({ width, height, events = false }: GeoMercatorProps) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 20) * 100;

  return width < 10 ? null : (
    <Zoom
    width={width}
    height={height}
    scaleXMin={100}
    scaleXMax={50000}
    scaleYMin={100}
    scaleYMax={50000}
    initialTransformMatrix={{
      scaleX: scale * 3,
      scaleY: scale * 3,
      translateX: centerX,
      translateY: centerY,
      skewX: 0,
      skewY: 0
    }}
  >
          {(zoom) => {
          return (
            <svg width={width} height={height}>
              <Mercator<FeatureShape>
                data={world.features}
                scale={zoom.transformMatrix.scaleX}
                clipExtent={[
                  [0, 0],
                  [width, height]
                ]}
                translate={[
                  zoom.transformMatrix.translateX,
                  zoom.transformMatrix.translateY
                ]}
                center={[120.91763, 23.858987]}
              >
                {(mercator) => (
                  <g>
                    <Graticule graticule={(g) => mercator.path(g) || ''} stroke="rgba(33,33,33,0.05)" />
                    {mercator.features.map(({ feature, path }, i) => (
                      <path
                        key={`map-feature-${i}`}
                        d={path || ''}
                        fill={color(feature.geometry.coordinates.length)}
                        stroke={background}
                        strokeWidth={0.5}
                        onClick={() => {
                          if (events) console.log(`Clicked: ${feature.properties.COUNTYNAME} (${feature.properties.COUNTYCODE})`);
                        }}
                      />
                    ))}
                  </g>
                )}
              </Mercator>
            </svg>
          )
                      }}
  </Zoom>
  );
}
export default TaiWanMap;
