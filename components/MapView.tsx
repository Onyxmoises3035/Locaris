'use client'
import { useEffect, useRef } from 'react';
import { Map, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

setWorkerUrl(
    new URL(
        'maplibre-gl/dist/maplibre-gl-worker.mjs',
        import.meta.url
    ).toString()
);

export default function MapView() {

    const mapContainer = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new Map({
            container: mapContainer.current,
            style: 'https://tiles.openfreemap.org/styles/liberty',
            center: [-99.1332, 19.4326],
            zoom: 11
        });

    }, []);

    return (
        <div ref={mapContainer} className='h-dvh w-full'></div>
    );
}