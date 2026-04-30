import React, { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";

import CalculateBounds from "./CalculateBounds";

const DALLAS = {
    lat: 32.848092,
    lon: -96.770822
}

const locations = [
    { id: 1, name: 'Warby Parker', street: '11700 Domain Blvd Suite 114', city: 'Austin', state: 'TX', zipCode: '78758', tier: {key: 'gold', name: 'Gold'}, position: {lat: 30.402968, lng: -97.720991} },
    { id: 2, name: 'ClearView Optics', street: '1980 East State Hwy 114', city: 'Southlake', state: 'TX', zipCode: '76092', tier: {key: 'bronze', name: 'Bronze'}, position: {lat: 32.945113, lng: -97.121117} },
    { id: 3, name: 'Stanton Optical', street: '3620 W University Dr #400', city: 'McKinney', state: 'TX', zipCode: '75071', tier: {key: '', name: ''}, position: {lat: 33.217463, lng: -96.660282} },
    { id: 4, name: 'Roka', street: '5646 Milton St. Suite 540', city: 'Dallas', state: 'TX', zipCode: '75206', tier: {key: 'silver', name: 'Silver'}, position: {lat: 32.848092, lng: -96.770822} }
];

const Map = ({}) => {
    const [center, setCenter] = useState([DALLAS.lat, DALLAS.lon]);
    const [hoveredMarker, setHoveredMarker] = useState(null);

    const handleMarkerClick = (location) => {

        if (typeof Liferay !== "undefined"?.fire) {
            Liferay.fire("selectDistributor", location);
        } else if (typeof window !== "undefined" && window.Liferay?.fire) {
            window.Liferay.fire("selectDistributor", location);
        } else if (typeof Liferay !== "undefined" && Liferay?.fire) {
            Liferay.fire("selectDistributor", location);
        }
    };

    if (!locations) return null;

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <MapContainer center={center} zoom={4} style={{ width: "100%", height: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <CalculateBounds items={locations} />

                {locations.map((location) => {

                    const lat = Number(location.position.lat);
                    const lon = Number(location.position.lng);

                    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

                    return (
                        <Marker
                            key={location.id}
                            position={[lat, lon]}
                            icon={
                                new L.Icon({
                                    iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png",
                                    iconSize: [32, 32],
                                    iconAnchor: [16, 32],
                                })
                            }                            
                            eventHandlers={{
                                mouseover: () => setHoveredMarker(location.id),
                                mouseout: () => setHoveredMarker(null),
                                click: () => handleMarkerClick(location),
                            }}
                        >
                        {hoveredMarker === location.id && (
                            <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent>
                                <div style={{ width: 200, whiteSpace: "normal" }}>
                                    <h5>{location.name}</h5>
                                    <div>{location.street}</div>
                                    <div>
                                        {location.city}, {location.state}, {location.zipCode}
                                    </div>
                                </div>
                            </Tooltip>
                        )}
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Map;