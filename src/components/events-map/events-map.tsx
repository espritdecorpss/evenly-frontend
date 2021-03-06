import { Map, Marker } from "react-map-gl";
import { ColorThemes } from "../../types/global";
import { EventData } from "../../types/event";
import { Event } from "../../models/event";
import './events-map.css';

const mapboxAccessToken = 'pk.eyJ1IjoicHV6aWJveSIsImEiOiJjbDBqYjFtZnIwYXVhM2VwNmUxYTQ1aGRuIn0.Xg9JAhEe0H5ci0aKPfB9sQ';

interface EventFeatureData extends EventData {
    id: number
}

interface MapProps {
    theme: ColorThemes
    events: Event[]
}

interface MarkerBodyProps {
    eventContent: EventData
    isSelected?: boolean
}

function serializeEventsToFeatureCollection(events: Event[]): GeoJSON.FeatureCollection<GeoJSON.Point, EventFeatureData> {
    return {
        type: 'FeatureCollection',
        features: events.map(event => ({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    event.coordinates.lng, event.coordinates.lat
                ]
            },
            properties: { ...event.content, id: event.id }
        }))
    };
}

const MarkerBody = ({ eventContent, isSelected = false }: MarkerBodyProps) => {
    const markerStyles = [
        'marker-body',
        isSelected ? 'selected' : ''
    ].join(' ');

    return (
        <div className={markerStyles}>
            {eventContent.title}
        </div>
    );
}

export default function EventsMap ({ theme, events }: MapProps) {
    const mapboxStyle = theme === ColorThemes.DARK ? 
        'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10';

    return (
        <Map
            mapboxAccessToken={mapboxAccessToken}
            initialViewState={{
                latitude: 59.436962,
                longitude: 24.753574,
                zoom: 12
            }}
            mapStyle={mapboxStyle}
            doubleClickZoom={false}
        >
            {events.map(event => (
                <Marker
                    key={event.id}

                    longitude={event.coordinates.lng}
                    latitude={event.coordinates.lat}

                    style={{
                        width: '25px', height: '25px', cursor: 'pointer'
                    }}

                    onClick={() => event.clickAction()}
                >
                    <MarkerBody eventContent={event.content} isSelected={event.isSelected} />
                </Marker>
            ))}
        </Map>
    );
}