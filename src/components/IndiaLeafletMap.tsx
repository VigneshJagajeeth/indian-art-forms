import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArtLocation, INFLUENCE_PATHS } from '../data/artData';
import { getMasterpieceImage } from '../data/artImages';
import { Layers, MapPin, ZoomIn, ZoomOut, RotateCcw, Compass, ExternalLink } from 'lucide-react';

interface IndiaLeafletMapProps {
  locations: ArtLocation[];
  selectedLocation: ArtLocation | null;
  onSelectLocation: (loc: ArtLocation) => void;
  showInfluenceLines: boolean;
}

export const IndiaLeafletMap: React.FC<IndiaLeafletMapProps> = ({
  locations,
  selectedLocation,
  onSelectLocation,
  showInfluenceLines
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const linesLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [tileMode, setTileMode] = useState<'carto' | 'satellite' | 'topo' | 'osm'>('carto');

  const tileUrls = {
    carto: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap, &copy; CARTO Voyager'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri World Imagery, DigitalGlobe, GeoEye, Earthstar Geographics'
    },
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap, &copy; OpenTopoMap'
    },
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors'
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [22.8, 80.0],
        zoom: 5,
        minZoom: 4,
        maxZoom: 14,
        zoomControl: false
      });

      const activeTile = tileUrls[tileMode];
      const tiles = L.tileLayer(activeTile.url, {
        attribution: activeTile.attribution,
        maxZoom: 18
      }).addTo(map);

      tileLayerRef.current = tiles;

      const markersGroup = L.layerGroup().addTo(map);
      const linesGroup = L.layerGroup().addTo(map);

      markersLayerRef.current = markersGroup;
      linesLayerRef.current = linesGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const activeTile = tileUrls[tileMode];
    tileLayerRef.current.setUrl(activeTile.url);
  }, [tileMode]);

  // Update Markers & Lines
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    const linesGroup = linesLayerRef.current;
    if (!map || !markersGroup || !linesGroup) return;

    markersGroup.clearLayers();
    linesGroup.clearLayers();

    // Draw Influence Lines
    if (showInfluenceLines) {
      INFLUENCE_PATHS.forEach((path) => {
        const srcLoc = locations.find((l) => l.id === path.sourceId);
        const tgtLoc = locations.find((l) => l.id === path.targetId);
        if (srcLoc && tgtLoc) {
          // Curved middle waypoint
          const midLat = (srcLoc.geo.lat + tgtLoc.geo.lat) / 2 + 0.8;
          const midLng = (srcLoc.geo.lng + tgtLoc.geo.lng) / 2 - 0.5;

          const polyline = L.polyline(
            [
              [srcLoc.geo.lat, srcLoc.geo.lng],
              [midLat, midLng],
              [tgtLoc.geo.lat, tgtLoc.geo.lng]
            ],
            {
              color: path.color || '#D97706',
              weight: 2.5,
              opacity: 0.85,
              dashArray: '6, 8',
              lineCap: 'round',
              lineJoin: 'round'
            }
          );
          polyline.bindTooltip(
            `<div class="text-xs font-serif font-bold text-amber-900">${path.title}</div><div class="text-[11px] text-stone-600">${path.eraContext}</div>`,
            { sticky: true }
          );
          polyline.addTo(linesGroup);
        }
      });
    }

    // Draw Markers
    locations.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const markerHtml = `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div style="
            width: ${isSelected ? '28px' : '20px'};
            height: ${isSelected ? '28px' : '20px'};
            border-radius: 9999px;
            background-color: ${loc.masterpiece.accentColor};
            border: 2.5px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            font-weight: bold;
            transition: transform 0.2s ease;
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          ">
            ${isSelected ? '★' : '•'}
          </div>
          <div style="
            background: rgba(255, 255, 255, 0.92);
            padding: 1px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 600;
            color: #1c1917;
            white-space: nowrap;
            box-shadow: 0 1px 4px rgba(0,0,0,0.2);
            margin-top: 3px;
            border: 1px solid rgba(217, 119, 6, 0.3);
          ">
            ${loc.name}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [80, 40],
        iconAnchor: [40, 14]
      });

      const marker = L.marker([loc.geo.lat, loc.geo.lng], { icon: customIcon });

      marker.on('click', () => {
        onSelectLocation(loc);
      });

      const imgUrl = loc.masterpiece.imageUrl || getMasterpieceImage(loc.id).imageUrl;

      marker.bindPopup(`
        <div style="font-family: serif; min-width: 240px; max-width: 280px; overflow: hidden; border-radius: 8px;">
          <div style="height: 110px; width: 100%; overflow: hidden; background: #1c1917; position: relative;">
            <img src="${imgUrl}" alt="${loc.masterpiece.title}" referrerpolicy="no-referrer" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 40px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);"></div>
            <div style="position: absolute; bottom: 6px; left: 8px; font-size: 10px; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.05em; color: #fde68a; font-weight: bold;">
              ${loc.eraPeriod}
            </div>
          </div>
          <div style="padding: 10px 6px 4px 6px;">
            <h4 style="font-size: 15px; font-weight: bold; margin: 0 0 4px 0; color: #1c1917; line-height: 1.2;">
              ${loc.name}
            </h4>
            <p style="font-size: 12px; margin: 0 0 4px 0; color: #44403c;">
              <strong>Tradition:</strong> ${loc.movementName}
            </p>
            <div style="font-size: 11px; color: #78716c; margin-bottom: 8px;">
              📍 ${loc.cityOrSite}, ${loc.state}
            </div>
            <div style="font-size: 11px; font-style: italic; color: #292524; background: #fdfaf7; padding: 6px 8px; border-radius: 6px; border-left: 3px solid ${loc.masterpiece.accentColor}; margin-bottom: 8px;">
              "${loc.masterpiece.title}" (${loc.masterpiece.year})
            </div>
            <div style="text-align: right;">
              <span style="display: inline-block; font-size: 10px; font-family: sans-serif; font-weight: 600; color: #b45309; text-transform: uppercase;">
                Click marker to open dossier →
              </span>
            </div>
          </div>
        </div>
      `);

      marker.addTo(markersGroup);

      if (isSelected) {
        marker.openPopup();
      }
    });
  }, [locations, selectedLocation, showInfluenceLines]);

  // Pan to selected location
  useEffect(() => {
    if (selectedLocation && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedLocation.geo.lat, selectedLocation.geo.lng],
        7,
        { duration: 1.2 }
      );
    }
  }, [selectedLocation]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.flyTo([22.8, 80.0], 5, { duration: 1 });
  };

  const jumpToRegion = (bounds: [number, number], zoomLevel: number) => {
    mapInstanceRef.current?.flyTo(bounds, zoomLevel, { duration: 1.2 });
  };

  return (
    <div className="relative w-full h-[620px] rounded-xl overflow-hidden shadow-2xl border border-stone-300 bg-stone-100">
      {/* Real GIS Leaflet Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Basemap Selector */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-lg shadow-md border border-stone-200 text-xs">
        <span className="font-serif font-bold text-stone-700 flex items-center gap-1.5 mr-2 pr-2 border-r border-stone-200">
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          Basemap:
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setTileMode('carto')}
            className={`px-2.5 py-1 rounded transition-colors ${
              tileMode === 'carto'
                ? 'bg-amber-800 text-white font-medium shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Antique Voyager
          </button>
          <button
            onClick={() => setTileMode('satellite')}
            className={`px-2.5 py-1 rounded transition-colors ${
              tileMode === 'satellite'
                ? 'bg-amber-800 text-white font-medium shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            🛰️ Satellite
          </button>
          <button
            onClick={() => setTileMode('topo')}
            className={`px-2.5 py-1 rounded transition-colors ${
              tileMode === 'topo'
                ? 'bg-amber-800 text-white font-medium shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            Physical Relief
          </button>
          <button
            onClick={() => setTileMode('osm')}
            className={`px-2.5 py-1 rounded transition-colors ${
              tileMode === 'osm'
                ? 'bg-amber-800 text-white font-medium shadow-sm'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            OpenStreetMap
          </button>
        </div>
      </div>

      {/* Region Fast Zoom Jumps */}
      <div className="absolute top-4 right-4 z-[1000] flex gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-md border border-stone-200 text-xs">
        <span className="text-[11px] font-serif text-stone-600 self-center px-1 font-semibold">
          Focus:
        </span>
        <button
          onClick={() => jumpToRegion([32.5, 75.5], 6)}
          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-100 text-stone-700 font-medium"
        >
          North
        </button>
        <button
          onClick={() => jumpToRegion([13.0, 78.5], 6)}
          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-100 text-stone-700 font-medium"
        >
          South
        </button>
        <button
          onClick={() => jumpToRegion([23.5, 86.5], 6)}
          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-100 text-stone-700 font-medium"
        >
          East
        </button>
        <button
          onClick={() => jumpToRegion([24.0, 73.0], 6)}
          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-100 text-stone-700 font-medium"
        >
          West
        </button>
        <button
          onClick={() => jumpToRegion([22.5, 78.5], 6)}
          className="px-2 py-0.5 rounded bg-stone-100 hover:bg-amber-100 text-stone-700 font-medium"
        >
          Central
        </button>
      </div>

      {/* Floating Map Controls */}
      <div className="absolute bottom-6 right-4 z-[1000] flex flex-col gap-2">
        <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-stone-200 overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-amber-50 text-stone-700 transition-colors border-b border-stone-200"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-amber-50 text-stone-700 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleReset}
          className="p-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-stone-200 hover:bg-amber-50 text-stone-700 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Legend Badge */}
      <div className="absolute bottom-6 left-4 z-[1000] bg-white/95 backdrop-blur-md p-2.5 rounded-lg shadow-lg border border-stone-200 text-xs flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-stone-700 font-serif">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse"></span>
          <span><strong>${locations.length}</strong> Historic Centers</span>
        </div>
        <div className="h-3 w-px bg-stone-300"></div>
        <div className="text-stone-500 font-sans">
          Click any pin to inspect accession records
        </div>
      </div>
    </div>
  );
};
