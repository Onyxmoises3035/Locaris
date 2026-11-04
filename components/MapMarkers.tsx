'use client';
import { useEffect } from 'react';
import { Marker, Popup, type Map as MapLibreMap } from 'maplibre-gl';
import places from '@/src/data/places.json';
import { placeCategories } from '@/src/lib/category';

interface MapMarkersProps { map: MapLibreMap | null; }

export default function MapMarkers({ map }: MapMarkersProps) {

    useEffect(() => {

        if (!map) return;

        // Arreglo para almacenar los markers
        const markers: Marker[] = [];

        // Función para crear todos los markers
        const createMarkers = () => {

            places.forEach((place) => {

                // Obtener categoría
                const category = placeCategories[
                    place.category as keyof typeof placeCategories
                ] ?? placeCategories.landmark;

                // Contenedor principal
                const markerElement = document.createElement('div');

                Object.assign(markerElement.style, {
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: category.color,
                    border: '3px solid white',
                    borderRadius: '50%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    cursor: 'pointer'
                });

                // Icono SVG
                const iconElement = document.createElement('span');

                const svgUrl = `url("${category.icon}")`;

                Object.assign(iconElement.style, {
                    display: 'block',
                    flex: '0 0 22px',
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#FFFFFF',
                    maskImage: svgUrl,
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain'
                });

                // Compatibilidad WebKit
                iconElement.style.setProperty(
                    '-webkit-mask-image',
                    svgUrl
                );

                iconElement.style.setProperty(
                    '-webkit-mask-repeat',
                    'no-repeat'
                );

                iconElement.style.setProperty(
                    '-webkit-mask-position',
                    'center'
                );

                iconElement.style.setProperty(
                    '-webkit-mask-size',
                    'contain'
                );

                markerElement.appendChild(iconElement);

                // Contenido del popup
                const popupContent = document.createElement('div');

                Object.assign(popupContent.style, {
                    color: '#000000',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    maxWidth: '200px'
                });

                const title = document.createElement('strong');
                title.textContent = place.name;

                const description = document.createElement('p');
                description.textContent = place.description;

                popupContent.append(title, description);

                // Crear popup
                const popup = new Popup({
                    offset: 25
                }).setDOMContent(popupContent);

                // Coordenadas
                const coordinates: [number, number] = [
                    place.longitude,
                    place.latitude
                ];

                // Crear marker
                const marker = new Marker({
                    element: markerElement,
                    anchor: 'center'
                })
                    .setLngLat(coordinates)
                    .setPopup(popup)
                    .addTo(map);

                // Centrar el mapa al seleccionar el marker
                marker.getElement().addEventListener('click', () => {

                    map.flyTo({
                        center: coordinates,
                        zoom: Math.max(map.getZoom(), 16),
                        speed: 1.2,
                        curve: 1.4,
                        essential: true
                    });

                });

                markers.push(marker);

            });

            console.log('Markers cargados correctamente');
        };

        // Comprobar si el mapa ya terminó de cargar
        if (map.isStyleLoaded()) {
            createMarkers();
        } else {
            map.once('load', createMarkers);
        }

        // Limpiar markers
        return () => {

            map.off('load', createMarkers);

            markers.forEach(marker => {
                marker.remove();
            });

        };

    }, [map]);

    return null;
}