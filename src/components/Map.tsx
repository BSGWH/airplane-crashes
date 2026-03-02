'use client';

import { useState } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/mapbox';
import type { LayerProps, MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { crashes } from '@/data/crashes';
import type { PointType } from '@/data/crashes';
import CrashPanel from '@/components/CrashPanel';

const STYLES = {
  Light: 'mapbox://styles/mapbox/light-v11',
  Streets: 'mapbox://styles/mapbox/streets-v12',
};

type StyleName = keyof typeof STYLES;

const MARKER_CONFIG: Record<PointType, { dot: string; label: string }> = {
  departure:   { dot: 'bg-emerald-400', label: 'text-emerald-700' },
  destination: { dot: 'bg-blue-300',   label: 'text-blue-600' },
  last_known:  { dot: 'bg-amber-300',  label: 'text-amber-700' },
  crash_site:  { dot: 'bg-red-400',    label: 'text-red-700' },
};

export default function MapComponent() {
  const [activeStyle, setActiveStyle] = useState<StyleName>('Light');
  const [isActive, setIsActive] = useState(false);

  const crash = crashes[0];

  const actualPathLayer: LayerProps = {
    id: 'actual-path',
    type: 'line',
    paint: {
      'line-color': '#ef4444',
      'line-width': isActive ? 2.5 : 1,
      'line-opacity': isActive ? 1 : 0.2,
    },
  };

  const actualPathGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: crash.actualPath },
    properties: {},
  };

  const handleMapClick = (e: MapMouseEvent) => {
    setIsActive(e.features != null && e.features.length > 0);
  };

  return (
    <div className="relative w-full h-screen">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ longitude: -20, latitude: 14, zoom: 3 }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={STYLES[activeStyle]}
        interactiveLayerIds={['actual-path-hitbox']}
        onClick={handleMapClick}
      >
        <Source type="geojson" data={actualPathGeoJSON}>
          <Layer {...actualPathLayer} />
          {/* Invisible wide layer for easier clicking */}
          <Layer
            id="actual-path-hitbox"
            type="line"
            paint={{ 'line-color': 'transparent', 'line-width': 20 }}
          />
        </Source>

        {crash.points.map((point) => {
          const cfg = MARKER_CONFIG[point.type];
          return (
            <Marker
              key={point.type}
              longitude={point.coordinates[0]}
              latitude={point.coordinates[1]}
              anchor="center"
            >
              <div
                className="flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => setIsActive(true)}
              >
                <div className={`rounded-full ring-2 ring-white shadow transition-all duration-200 ${cfg.dot} ${isActive ? 'w-3.5 h-3.5' : 'w-2 h-2 opacity-25'}`} />
                {isActive && (
                  <span className={`text-[10px] font-semibold ${cfg.label} bg-white/90 px-1.5 py-0.5 rounded shadow whitespace-nowrap`}>
                    {point.label}
                    {point.time && <span className="font-normal ml-1 text-gray-500">{point.time}</span>}
                  </span>
                )}
              </div>
            </Marker>
          );
        })}
      </Map>

      <CrashPanel crash={crash} isOpen={isActive} />

      {/* Style switcher */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-white rounded-lg py-1.5 px-2 shadow-md">
        {(Object.keys(STYLES) as StyleName[]).map((name) => (
          <button
            key={name}
            onClick={() => setActiveStyle(name)}
            className={`py-1 px-3.5 rounded-md cursor-pointer border-none transition-all duration-150 ${
              activeStyle === name
                ? 'bg-[#1a1a1a] text-white font-semibold'
                : 'bg-transparent text-[#333] font-normal'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
