'use client';
import { useEffect, useRef, useState } from 'react';
import { Map, setWorkerUrl } from 'maplibre-gl';
import MapMarkers from './MapMarkers';
import MapControls from './MapControls';

import 'maplibre-gl/dist/maplibre-gl.css';

// Configuración del Worker
setWorkerUrl(
    new URL(
        'maplibre-gl/dist/maplibre-gl-worker.mjs',
        import.meta.url
    ).toString()
);

// Vista inicial
const INITIAL_CENTER: [number, number] = [
    -99.1332,
    19.4326
];

const INITIAL_ZOOM = 11;

export default function MapView() {

    // Contenedor HTML del mapa
    const mapContainer = useRef<HTMLDivElement>(null);

    // Referencia de MapLibre
    const mapRef = useRef<Map | null>(null);

    // Estado para compartir la instancia con otros componentes
    const [mapInstance, setMapInstance] = useState<Map | null>(null);

    // Inicializar mapa
    useEffect(() => {

        if (!mapContainer.current) return;

        const map = new Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/positron',
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM
        });

        // Guardar instancia
        mapRef.current = map;
        setMapInstance(map);

        // Manejo de errores
        const handleError = (event: { error: unknown }) => {
            console.error('Error de MapLibre:', event.error);
        };

        map.on('error', handleError);

        // Limpiar mapa
        return () => {

            map.off('error', handleError);

            map.remove();

            mapRef.current = null;

        };
        
    }, []);

    // Reiniciar vista del mapa
    const resetView = () => {

        if (!mapRef.current) return;

        mapRef.current.flyTo({
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM,
            bearing: 0,
            pitch: 0,
            speed: 1.2,
            curve: 1.4,
            essential: true
        });
    };

    return (

        <div>

            {/* Contenedor del mapa */}
            <div
                ref={mapContainer}
                className="h-dvh w-full"
            />

            {/* Marcadores */}
            <MapMarkers map={mapInstance} />

            {/* Controles */}
            <MapControls onReset={resetView} />

        </div>

    );
}