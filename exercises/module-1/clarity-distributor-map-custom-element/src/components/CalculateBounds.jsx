import React, { useEffect, useMemo, useState } from "react";
import { useMap } from "react-leaflet";

const CalculateBounds = ({ items }) => {
    const map = useMap();

    useEffect(() => {
        if (!items || items.length === 0) return;

        const coords = items
            .map((it) => [Number(it.latitude), Number(it.longitude)])
            .filter(([lat, lon]) => Number.isFinite(lat) && Number.isFinite(lon));

        if (coords.length === 0) return;

        map.fitBounds(coords, { padding: [50, 50] });
    }, [items, map]);

    return null;
};

export default CalculateBounds;