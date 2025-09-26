'use client' 
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Bus, MapPin, Menu, User, Clock, Route, Circle, ListPlus } from 'lucide-react';

// --- Global Data and Configuration (Based on User Input) ---

// Provided JSON data structure
const initialBusData = {
    "message": "Amana Transportation bus data retrieved successfully",
    "company_info": {
        "name": "Amana Transportation",
        "founded": "2019",
        "headquarters": "Kuala Lumpur, Malaysia",
        "industry": "Public Transportation",
        "description": "Modern public bus service connecting key areas in Kuala Lumpur and surrounding regions, focused on reliability and passenger comfort."
    },
    "bus_lines": [{
        "id": 1,
        "name": "KLCC - Petaling Jaya Express",
        "route_number": "B101",
        "current_location": {
            "latitude": 3.158,
            "longitude": 101.711,
            "address": "Jalan Ampang, near KLCC Twin Towers, Kuala Lumpur"
        },
        "status": "Active",
        "passengers": {
            "current": 32,
            "capacity": 45,
            "utilization_percentage": 71
        },
        "driver": {
            "name": "Ahmad Rahman",
            "id": "DRV001",
            "shift_start": "06:00",
            "shift_end": "18:00"
        },
        "bus_stops": [{
            "id": 1,
            "name": "KLCC Station",
            "latitude": 3.1578,
            "longitude": 101.7114,
            "estimated_arrival": "14:20",
            "is_next_stop": true
        }, {
            "id": 2,
            "name": "Pavilion KL",
            "latitude": 3.149,
            "longitude": 101.7101,
            "estimated_arrival": "14:28",
            "is_next_stop": false
        }, {
            "id": 3,
            "name": "Mid Valley Megamall",
            "latitude": 3.1177,
            "longitude": 101.6774,
            "estimated_arrival": "14:42",
            "is_next_stop": false
        }, {
            "id": 4,
            "name": "KL Sentral",
            "latitude": 3.1338,
            "longitude": 101.6869,
            "estimated_arrival": "14:50",
            "is_next_stop": false
        }, {
            "id": 5,
            "name": "Universiti Malaya",
            "latitude": 3.1204,
            "longitude": 101.6535,
            "estimated_arrival": "15:05",
            "is_next_stop": false
        }, {
            "id": 6,
            "name": "Petaling Jaya SS2",
            "latitude": 3.1147,
            "longitude": 101.624,
            "estimated_arrival": "15:18",
            "is_next_stop": false
        }, {
            "id": 7,
            "name": "1 Utama Shopping Centre",
            "latitude": 3.1502,
            "longitude": 101.6154,
            "estimated_arrival": "15:35",
            "is_next_stop": false
        }],
        "incidents": [{
            "id": 1,
            "type": "Mechanical",
            "description": "Brake system warning",
            "reported_by": "Driver-1A",
            "reported_time": "7:28 AM",
            "status": "Canceled",
            "priority": "Critical"
        }],
        "vehicle_info": {
            "license_plate": "WKL 2891",
            "model": "Scania K230UB",
            "year": 2019,
            "fuel_level": 75,
            "last_maintenance": "2024-12-01"
        },
        "route_info": {
            "total_distance": 28.5,
            "average_speed": 25,
            "estimated_completion": "16:00",
            "frequency_minutes": 20
        }
    }, {
        "id": 2,
        "name": "Old Town - Mont Kiara Connector",
        "route_number": "B205",
        "current_location": {
            "latitude": 3.139,
            "longitude": 101.6869,
            "address": "KL Sentral Transportation Hub, Kuala Lumpur"
        },
        "status": "Active",
        "passengers": {
            "current": 28,
            "capacity": 40,
            "utilization_percentage": 70
        },
        "driver": {
            "name": "Siti Aminah",
            "id": "DRV002",
            "shift_start": "05:30",
            "shift_end": "17:30"
        },
        "bus_stops": [{
            "id": 1,
            "name": "KL Sentral",
            "latitude": 3.1338,
            "longitude": 101.6869,
            "estimated_arrival": "14:15",
            "is_next_stop": false
        }, {
            "id": 2,
            "name": "Central Market",
            "latitude": 3.1427,
            "longitude": 101.6964,
            "estimated_arrival": "14:25",
            "is_next_stop": true
        }, {
            "id": 3,
            "name": "Chinatown",
            "latitude": 3.1436,
            "longitude": 101.6958,
            "estimated_arrival": "14:30",
            "is_next_stop": false
        }, {
            "id": 4,
            "name": "Titiwangsa LRT",
            "latitude": 3.1729,
            "longitude": 101.7016,
            "estimated_arrival": "14:45",
            "is_next_stop": false
        }, {
            "id": 5,
            "name": "Mont Kiara",
            "latitude": 3.1727,
            "longitude": 101.6509,
            "estimated_arrival": "15:00",
            "is_next_stop": false
        }, {
            "id": 6,
            "name": "Sri Hartamas",
            "latitude": 3.1653,
            "longitude": 101.6493,
            "estimated_arrival": "15:10",
            "is_next_stop": false
        }],
        "incidents": [{
            "id": 1,
            "type": "Mechanical",
            "description": "AC malfunction",
            "reported_by": "Driver-2A",
            "reported_time": "2:35 PM",
            "status": "Resolved",
            "priority": "Medium"
        }, {
            "id": 2,
            "type": "Passenger",
            "description": "Unruly passenger",
            "reported_by": "Driver-2B",
            "reported_time": "8:05 AM",
            "status": "Resolved",
            "priority": "Medium"
        }],
        "vehicle_info": {
            "license_plate": "WKL 1547",
            "model": "Mercedes-Benz Citaro",
            "year": 2020,
            "fuel_level": 60,
            "last_maintenance": "2024-11-28"
        },
        "route_info": {
            "total_distance": 22.3,
            "average_speed": 22,
            "estimated_completion": "15:30",
            "frequency_minutes": 25
        }
    }, {
        "id": 3,
        "name": "Airport - City Circle",
        "route_number": "B350",
        "current_location": {
            "latitude": 2.7456,
            "longitude": 101.7072,
            "address": "KLIA Express Station, Sepang, Selangor"
        },
        "status": "Active",
        "passengers": {
            "current": 15,
            "capacity": 50,
            "utilization_percentage": 30
        },
        "driver": {
            "name": "Lim Wei Ming",
            "id": "DRV003",
            "shift_start": "04:00",
            "shift_end": "16:00"
        },
        "bus_stops": [{
            "id": 1,
            "name": "KLIA Terminal 1",
            "latitude": 2.7456,
            "longitude": 101.7072,
            "estimated_arrival": "14:30",
            "is_next_stop": false
        }, {
            "id": 2,
            "name": "KLIA Terminal 2",
            "latitude": 2.7389,
            "longitude": 101.6997,
            "estimated_arrival": "14:40",
            "is_next_stop": false
        }, {
            "id": 3,
            "name": "Putrajaya Central",
            "latitude": 2.9264,
            "longitude": 101.6964,
            "estimated_arrival": "15:10",
            "is_next_stop": true
        }, {
            "id": 4,
            "name": "Cyberjaya",
            "latitude": 2.9213,
            "longitude": 101.6543,
            "estimated_arrival": "15:25",
            "is_next_stop": false
        }, {
            "id": 5,
            "name": "Bandar Tun Razak",
            "latitude": 3.0733,
            "longitude": 101.7317,
            "estimated_arrival": "15:55",
            "is_next_stop": false
        }, {
            "id": 6,
            "name": "KL City Centre",
            "latitude": 3.1519,
            "longitude": 101.7077,
            "estimated_arrival": "16:20",
            "is_next_stop": false
        }, {
            "id": 7,
            "name": "Batu Caves",
            "latitude": 3.2379,
            "longitude": 101.684,
            "estimated_arrival": "16:45",
            "is_next_stop": false
        }, {
            "id": 8,
            "name": "Gombak Terminal",
            "latitude": 3.2642,
            "longitude": 101.7003,
            "estimated_arrival": "17:00",
            "is_next_stop": false
        }],
        "incidents": [],
        "vehicle_info": {
            "license_plate": "WKL 3429",
            "model": "Volvo B8RLE",
            "year": 2018,
            "fuel_level": 40,
            "last_maintenance": "2024-12-03"
        },
        "route_info": {
            "total_distance": 85.2,
            "average_speed": 35,
            "estimated_completion": "17:30",
            "frequency_minutes": 45
        }
    }, {
        "id": 4,
        "name": "University Express",
        "route_number": "B410",
        "current_location": {
            "latitude": 3.1204,
            "longitude": 101.6535,
            "address": "Universiti Malaya Main Campus, Kuala Lumpur"
        },
        "status": "Maintenance",
        "passengers": {
            "current": 0,
            "capacity": 35,
            "utilization_percentage": 0
        },
        "driver": {
            "name": "Raj Kumar",
            "id": "DRV004",
            "shift_start": "06:30",
            "shift_end": "18:30"
        },
        "bus_stops": [{
            "id": 1,
            "name": "Universiti Malaya",
            "latitude": 3.1204,
            "longitude": 101.6535,
            "estimated_arrival": "N/A",
            "is_next_stop": false
        }, {
            "id": 2,
            "name": "UCSI University",
            "latitude": 3.0411,
            "longitude": 101.7089,
            "estimated_arrival": "N/A",
            "is_next_stop": false
        }, {
            "id": 3,
            "name": "Taylor's University",
            "latitude": 3.0653,
            "longitude": 101.6075,
            "estimated_arrival": "N/A",
            "is_next_stop": false
        }, {
            "id": 4,
            "name": "Sunway University",
            "latitude": 3.0653,
            "longitude": 101.6037,
            "estimated_arrival": "N/A",
            "is_next_stop": false
        }, {
            "id": 5,
            "name": "INTI International University",
            "latitude": 3.0534,
            "longitude": 101.5934,
            "estimated_arrival": "N/A",
            "is_next_stop": false
        }, {
            "id": 6,
            "name": "Monash University Malaysia",
            "latitude": 3.0653,
            "longitude": 101.6016,
            "estimated_arrival": "N/A",
            "is_next_stop": false
        }],
        "incidents": [{
            "id": 1,
            "type": "Mechanical",
            "description": "AC malfunction",
            "reported_by": "Driver-4A",
            "reported_time": "4:57 PM",
            "status": "Canceled",
            "priority": "Medium"
        }],
        "vehicle_info": {
            "license_plate": "WKL 7856",
            "model": "Isuzu NPR",
            "year": 2017,
            "fuel_level": 85,
            "last_maintenance": "2024-12-05"
        },
        "route_info": {
            "total_distance": 45.8,
            "average_speed": 20,
            "estimated_completion": "N/A",
            "frequency_minutes": 30
        }
    }, {
        "id": 5,
        "name": "Shopping District Shuttle",
        "route_number": "B520",
        "current_location": {
            "latitude": 3.149,
            "longitude": 101.7101,
            "address": "Pavilion Kuala Lumpur, Bukit Bintang"
        },
        "status": "Active",
        "passengers": {
            "current": 42,
            "capacity": 45,
            "utilization_percentage": 93
        },
        "driver": {
            "name": "Fatimah Zahra",
            "id": "DRV005",
            "shift_start": "07:00",
            "shift_end": "19:00"
        },
        "bus_stops": [{
            "id": 1,
            "name": "Pavilion KL",
            "latitude": 3.149,
            "longitude": 101.7101,
            "estimated_arrival": "14:22",
            "is_next_stop": false
        }, {
            "id": 2,
            "name": "Lot 10 Shopping Centre",
            "latitude": 3.1479,
            "longitude": 101.7100,
            "estimated_arrival": "14:25",
            "is_next_stop": true
        }, {
            "id": 3,
            "name": "Times Square KL",
            "latitude": 3.1427,
            "longitude": 101.7105,
            "estimated_arrival": "14:32",
            "is_next_stop": false
        }, {
            "id": 4,
            "name": "Suria KLCC",
            "latitude": 3.158,
            "longitude": 101.7123,
            "estimated_arrival": "14:40",
            "is_next_stop": false
        }, {
            "id": 5,
            "name": "Avenue K",
            "latitude": 3.1612,
            "longitude": 101.7197,
            "estimated_arrival": "14:48",
            "is_next_stop": false
        }, {
            "id": 6,
            "name": "Intermark Mall",
            "latitude": 3.1606,
            "longitude": 101.7209,
            "estimated_arrival": "14:52",
            "is_next_stop": false
        }, {
            "id": 7,
            "name": "Ampang Park LRT",
            "latitude": 3.1615,
            "longitude": 101.713,
            "estimated_arrival": "15:00",
            "is_next_stop": false
        }, {
            "id": 8,
            "name": "Low Yat Plaza",
            "latitude": 3.1468,
            "longitude": 101.7099,
            "estimated_arrival": "15:08",
            "is_next_stop": false
        }, {
            "id": 9,
            "name": "Fahrenheit 88",
            "latitude": 3.1472,
            "longitude": 101.7097,
            "estimated_arrival": "15:12",
            "is_next_stop": false
        }],
        "incidents": [{
            "id": 1,
            "type": "Route",
            "description": "Detour required",
            "reported_by": "Driver-5A",
            "reported_time": "12:29 PM",
            "status": "Reported",
            "priority": "Medium"
        }],
        "vehicle_info": {
            "license_plate": "WKL 9123",
            "model": "BYD K9",
            "year": 2021,
            "fuel_level": 95,
            "last_maintenance": "2024-11-30"
        },
        "route_info": {
            "total_distance": 12.7,
            "average_speed": 15,
            "estimated_completion": "15:30",
            "frequency_minutes": 15
        }
    }],
    "operational_summary": {
        "total_buses": 5,
        "active_buses": 4,
        "maintenance_buses": 1,
        "out_of_service_buses": 0,
        "total_capacity": 215,
        "current_passengers": 117,
        "average_utilization": 53
    },
    "filters": {
        "available_statuses": ["Active", "Maintenance", "Out of Service"],
        "available_routes": ["B101", "B205", "B350", "B410", "B520"],
        "applied": {
            "status": null,
            "busId": null,
            "routeNumber": null
        }
    }
};

// Map configuration
const MAP_CENTER = [3.140853, 101.693207]; // Central Kuala Lumpur
const INITIAL_ZOOM = 11;
const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// --- Utility Functions for Map Icons (Must be defined outside the component or rely on window.L) ---

const createIcon = (className, htmlContent, size, anchor) => {
    // Check if L (Leaflet) is available globally before creating the icon
    if (typeof window.L === 'undefined' || !window.L.divIcon) {
        return null;
    }
    return new window.L.divIcon({
        className: className,
        html: htmlContent,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: [0, -anchor[1] + 5] // Adjust popup anchor relative to icon anchor
    });
};

const createBusIcon = (busId) => createIcon(
    'bg-green-500 rounded-full p-2 text-white shadow-xl animate-pulse cursor-pointer border-4 border-white',
    `<div class="w-6 h-6 flex items-center justify-center"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="m6 17v3"/><path d="m18 17v3"/><path d="M10 17V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14"/><path d="M5 17h14"/></svg></div>`,
    [40, 40],
    [20, 20]
);

const createStopIcon = (isNextStop) => createIcon(
    isNextStop
        ? 'bg-orange-500 rounded-full p-2 text-white shadow-lg border-4 border-white animate-bounce-slow'
        : 'bg-red-500 rounded-full p-2 text-white shadow-lg border-4 border-white cursor-pointer',
    `<div class="w-6 h-6 flex items-center justify-center"><svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
    [30, 30],
    [15, 30]
);

// --- React Hook for Leaflet Map Initialization (using standard DOM access) ---

const useLeafletMap = (mapRef, busData, selectedBus, handleBusSelect, allStops) => {
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const routeRef = useRef(null);
    const [isLeafletLoaded, setIsLeafletLoaded] = useState(false); // State to track Leaflet load status

    // Function to initialize the map
    const initMap = () => {
        // Double-check if L is available and map container exists
        if (!mapRef.current || mapInstanceRef.current || typeof window.L === 'undefined' || !window.L.map) return;

        console.log("Leaflet initialized, creating map instance.");

        mapInstanceRef.current = window.L.map(mapRef.current, {
            center: MAP_CENTER,
            zoom: INITIAL_ZOOM,
            // Disable default Leaflet marker shadow/image paths
            preferCanvas: true // Use canvas for performance
        });

        window.L.tileLayer(TILE_URL, {
            attribution: ATTRIBUTION,
            maxZoom: 18,
        }).addTo(mapInstanceRef.current);

        // Update markers immediately after initialization
        updateMap(busData, selectedBus, handleBusSelect, allStops);
    };

    // Effect for loading CSS and JS (only runs once)
    useEffect(() => {
        // If L is already available, skip loading and mark as ready
        if (typeof window.L !== 'undefined' && window.L.map) {
            setIsLeafletLoaded(true);
            return;
        }

        // Load CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
        document.head.appendChild(link);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';

        script.onload = () => {
            // Once script loads, set state to true
            setIsLeafletLoaded(true);
        };

        script.onerror = () => {
            console.error("Failed to load Leaflet script. Check CDN URL or network connection.");
        };

        document.body.appendChild(script);

        // Cleanup function for map instance
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Effect for initialization and updating (runs when 'isLeafletLoaded' or data changes)
    useEffect(() => {
        if (isLeafletLoaded) {
            if (!mapInstanceRef.current) {
                // First time map initialization
                initMap();
            } else {
                // Subsequent data updates
                updateMap(busData, selectedBus, handleBusSelect, allStops);
            }
        }
    }, [isLeafletLoaded, busData, selectedBus, allStops]); // Rerun when Leaflet is loaded or data changes

    // Function to update markers and route path
    const updateMap = (currentBusData, currentSelectedBus, currentHandleBusSelect, currentAllStops) => {
        const map = mapInstanceRef.current;
        if (!map || typeof window.L === 'undefined') return;

        // 1. Clear existing markers and route
        markersRef.current.forEach(marker => map.removeLayer(marker));
        markersRef.current = [];
        if (routeRef.current) {
            map.removeLayer(routeRef.current);
            routeRef.current = null;
        }

        let centerCoords = MAP_CENTER;
        let routeCoordinates = [];

        // 2. Add Bus Markers (Always show all buses)
        currentBusData.forEach(bus => {
            const busIcon = createBusIcon(bus.id);
            if (!busIcon) return;

            const busLocation = [bus.current_location.latitude, bus.current_location.longitude];
            const nextStop = bus.bus_stops.find(s => s.is_next_stop);
            const isSelected = currentSelectedBus && bus.id === currentSelectedBus.id;

            // Create Popup Content (Fulfills user request for details on click)
            const popupContent = `
                <div class="font-sans">
                    <h4 class="text-lg font-bold mb-1 ${isSelected ? 'text-orange-600' : 'text-green-600'}">
                        <svg class="inline w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="m6 17v3"/><path d="m18 17v3"/><path d="M10 17V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14"/><path d="M5 17h14"/></svg> ${bus.route_number} - ${bus.name}
                    </h4>
                    <p class="text-sm flex items-center mb-0.5">
                        <svg class="inline w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Passengers: ${bus.passengers.current} / ${bus.passengers.capacity} (${bus.passengers.utilization_percentage}%)
                    </p>
                    <p class="text-sm flex items-center">
                        <svg class="inline w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Next Stop: <span class="font-semibold text-orange-500 ml-1">${nextStop ? nextStop.name : 'N/A'}</span>
                    </p>
                    <p class="text-xs text-gray-500 mt-2">Current Location: ${bus.current_location.address}</p>
                </div>
            `;

            const marker = window.L.marker(busLocation, { icon: busIcon })
                .bindPopup(popupContent);

            marker.on('click', () => currentHandleBusSelect(bus.id));
            marker.addTo(map);
            markersRef.current.push(marker);

            if (isSelected) {
                centerCoords = busLocation;
                // Collect route coordinates if bus is selected
                routeCoordinates = bus.bus_stops.map(stop => [stop.latitude, stop.longitude]);
                // Ensure the popup is open when the bus is selected programmatically
                marker.openPopup();
            }
        });

        // 3. Determine which stops to plot based on selection (NEW LOGIC)
        let stopsToPlot = [];
        if (currentSelectedBus) {
            // If a bus is selected, plot only its stops
            stopsToPlot = currentSelectedBus.bus_stops.map(stop => ({
                name: stop.name,
                position: [stop.latitude, stop.longitude],
                isNextStop: stop.is_next_stop,
                // Simplified arrivals for the popup when filtered
                arrivals: [{
                    route: currentSelectedBus.route_number,
                    arrival: stop.estimated_arrival,
                    isNextStop: stop.is_next_stop
                }]
            }));
        } else {
            // If no bus is selected, plot all unique stops (original behavior)
            stopsToPlot = currentAllStops;
        }


        // 4. Add Stop Markers
        const addedStops = new Set();
        stopsToPlot.forEach(stop => {
            if (addedStops.has(stop.name)) return;
            addedStops.add(stop.name);

            // isNextStop is provided by the stopsToPlot structure now
            const isNextStop = stop.isNextStop || stop.arrivals.some(a => a.isNextStop);
            const stopIcon = createStopIcon(isNextStop);
            if (!stopIcon) return;

            // Create Popup Content for Stop
            const arrivalList = stop.arrivals.map(arrival => `
                <li class="${arrival.isNextStop ? 'font-bold text-orange-600' : 'text-gray-600'}">
                    ${arrival.route}: ${arrival.arrival}
                    ${arrival.isNextStop ? ' (Next Bus!)' : ''}
                </li>
            `).join('');

            const stopPopupContent = `
                <div class="font-sans">
                    <h4 class="text-lg font-bold mb-2 flex items-center">
                        <svg class="w-5 h-5 mr-1 text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> ${stop.name}
                    </h4>
                    <p class="font-semibold mb-1 text-sm text-gray-700">Next Arrivals:</p>
                    <ul class="list-disc pl-5 text-sm space-y-1 max-h-40 overflow-y-auto">
                        ${arrivalList}
                    </ul>
                </div>
            `;

            const marker = window.L.marker(stop.position, { icon: stopIcon })
                .bindPopup(stopPopupContent);

            marker.addTo(map);
            markersRef.current.push(marker);
        });

        // 5. Draw Route Line (Only draw if a bus is selected and coordinates were collected)
        if (routeCoordinates.length > 0) {
            routeRef.current = window.L.polyline(routeCoordinates, {
                color: '#f97316', // Orange
                weight: 5,
                opacity: 0.8
            }).addTo(map);
        }

        // 6. Center the map
        if (map.getCenter().lat !== centerCoords[0] || map.getCenter().lng !== centerCoords[1] || currentSelectedBus) {
            map.flyTo(centerCoords, currentSelectedBus ? 14 : INITIAL_ZOOM, {
                duration: 1.5,
            });
        }
    };

    return {
        isMapReady: !!mapInstanceRef.current
    };
};


// --- Main App Component ---

const App = () => {
    // State to hold the bus data (deep clone for potential future updates)
    const [busData] = useState(initialBusData.bus_lines);
    // State to track the currently selected bus ID
    const [selectedBusId, setSelectedBusId] = useState(null);
    // State to track filter status
    const [filterStatus, setFilterStatus] = useState(null);
    // Ref for the map container element
    const mapRef = useRef(null);

    // Filtered list of buses for the sidebar display
    const filteredBuses = useMemo(() => {
        if (!filterStatus) return busData;
        return busData.filter(bus => bus.status === filterStatus);
    }, [busData, filterStatus]);

    // Derived State: The currently selected bus object
    const selectedBus = useMemo(() => {
        return busData.find(bus => bus.id === selectedBusId) || null;
    }, [busData, selectedBusId]);

    // Handler for bus selection (Button click or Map click)
    const handleBusSelect = (busId) => {
        // Toggle selection: if the same bus is clicked, deselect it
        setSelectedBusId(prevId => prevId === busId ? null : busId);
    };

    // Derived State: All unique stops and their arrivals (Used when no single bus is selected)
    const allStops = useMemo(() => {
        let allStopsMap = new Map();

        busData.forEach(bus => {
            bus.bus_stops.forEach(stop => {
                const stopKey = stop.name;
                if (!allStopsMap.has(stopKey)) {
                    allStopsMap.set(stopKey, {
                        name: stop.name,
                        position: [stop.latitude, stop.longitude],
                        arrivals: [],
                        isNextStopOverall: false // New field to check if ANY bus has it as next stop
                    });
                }

                const stopData = allStopsMap.get(stopKey);
                stopData.arrivals.push({
                    route: bus.route_number,
                    arrival: stop.estimated_arrival,
                    isNextStop: stop.is_next_stop
                });

                if (stop.is_next_stop) {
                    stopData.isNextStopOverall = true;
                }
            });
        });

        // Sort by stop name
        return Array.from(allStopsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [busData]);

    // Derived State: Data source for the Stop Schedule Table (Dynamic based on selection)
    const stopsForTable = useMemo(() => {
        if (selectedBus) {
            // Return only the stops for the selected bus (filtered view)
            return selectedBus.bus_stops.map(stop => ({
                name: stop.name,
                position: [stop.latitude, stop.longitude],
                // Simplified arrivals array showing only the selected bus's info
                arrivals: [{
                    route: selectedBus.route_number,
                    arrival: stop.estimated_arrival,
                    isNextStop: stop.is_next_stop
                }],
                // Flag for row highlight when in single-bus mode
                isNextStopOverall: stop.is_next_stop
            }));
        }
        // Return the aggregated data when no bus is selected (all stops view)
        return allStops;
    }, [selectedBus, allStops]);


    // Initialize and update the Leaflet map via hook
    useLeafletMap(mapRef, busData, selectedBus, handleBusSelect, allStops);

    // Helper to determine status style
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'Maintenance':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Out of Service':
                return 'bg-red-100 text-red-700 border-red-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    // Simple Bus List component
    const BusList = ({ buses }) => (
        <div className="p-4 bg-white rounded-xl shadow-lg h-full overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2 flex items-center">
                <Bus className="w-5 h-5 mr-2 text-green-600" />
                Bus Routes ({filteredBuses.length} / {buses.length})
            </h3>
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
                {initialBusData.filters.available_statuses.map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(prev => prev === status ? null : status)}
                        className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                            filterStatus === status
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {filteredBuses.length > 0 ? filteredBuses.map((bus) => {
                    const isSelected = bus.id === selectedBusId;
                    const nextStop = bus.bus_stops.find(s => s.is_next_stop);
                    return (
                        <button
                            key={bus.id}
                            onClick={() => handleBusSelect(bus.id)}
                            className={`w-full p-3 rounded-lg text-left transition-all duration-300 shadow-md transform hover:scale-[1.01] ${
                                isSelected
                                    ? 'bg-orange-500 text-white shadow-orange-300/50 ring-2 ring-offset-2 ring-orange-500'
                                    : 'bg-green-600 text-white hover:bg-green-700 shadow-green-400/50'
                            } ${bus.status === 'Maintenance' && 'opacity-60 pointer-events-none'}`}
                            disabled={bus.status === 'Maintenance'}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">{bus.route_number} - {bus.name}</span>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusStyle(bus.status)} ${isSelected ? 'text-gray-900' : ''}`}>
                                    {bus.status}
                                </span>
                            </div>
                            <div className="text-sm mt-1 opacity-90 flex items-center space-x-2">
                                <Circle className="w-3 h-3 fill-white" />
                                <span>Next Stop: {nextStop ? `${nextStop.name} (${nextStop.estimated_arrival})` : 'N/A'}</span>
                            </div>
                        </button>
                    );
                }) : (
                    <div className="text-center p-6 text-gray-500 bg-gray-50 rounded-lg">
                        <ListPlus className="w-6 h-6 mx-auto mb-2" />
                        No buses found with status: {filterStatus}
                    </div>
                )}
            </div>
        </div>
    );


    return (
        <div className="min-h-screen flex flex-col font-['Inter'] bg-gray-50">
            {/* --- Header --- */}
            <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Branding */}
                        <div className="flex items-center space-x-3">
                            <Bus className="w-7 h-7 text-green-500" />
                            <span className="text-xl font-bold tracking-tight">Amanah Transport</span>
                        </div>
                        {/* Menu Link */}
                        <a href="#" className="text-sm font-medium hover:text-green-400 transition-colors rounded-full px-3 py-1.5 border border-transparent hover:border-green-500">
                            <Menu className="inline w-5 h-5 mr-1" /> Menu
                        </a>
                    </div>
                </div>
            </header>

            {/* --- Main Title Section --- */}
            <section className="pt-8 pb-4 bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">
Amana Transportation
                    </h1>
                    <p className="text-lg text-gray-600">
                        {selectedBus ? (
                            <>
                                Showing real-time route details for <span className="font-semibold text-orange-600">{selectedBus.route_number} - {selectedBus.name}</span>. Click again to see all routes.
                            </>
                        ) : (
                            initialBusData.company_info.description
                        )}
                    </p>
                </div>
            </section>

            {/* --- Main Content Layout (Sidebar + Map) --- */}
            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Bus List Sidebar (4/12 width) */}
                    <div className="lg:col-span-4 mb-8 lg:mb-0 h-[600px] lg:h-[700px] overflow-hidden">
                        <BusList buses={busData} />
                    </div>

                    {/* Map Section (8/12 width) */}
                    <div className="lg:col-span-8 h-[600px] lg:h-[700px]">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                            <h3 className="text-xl font-semibold text-gray-800 p-4 border-b">
                                <Route className="w-5 h-5 mr-2 inline text-red-600" />
                                Real-Time Bus & Route Map
                            </h3>
                            {/* Map Container - Leaflet will render here */}
                            <div
                                ref={mapRef}
                                id="leaflet-map-container"
                                className="h-[calc(100%-57px)]"
                                style={{ borderRadius: '0 0 0.75rem 0.75rem' }}
                            >
                                {/* Fallback content if map isn't ready */}
                                {!mapRef.current && (
                                    <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
                                        Loading Map Data... Please wait for Leaflet to load.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Table of Bus Stops and Arrivals (Fulfills user request for dynamic filtering) --- */}
                <section className="mt-12 p-6 bg-white rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                        <Clock className="w-6 h-6 mr-2 inline text-indigo-600" />
                        Stop Arrival Schedule
                        {selectedBus && (
                            <span className="ml-3 text-lg text-orange-600 font-semibold">
                                (Route: {selectedBus.route_number})
                            </span>
                        )}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                        {selectedBus
                            ? `Displaying the schedule for ${selectedBus.route_number}. The next stop is highlighted in orange.`
                            : 'Displaying aggregated arrival times for all active routes. Stops highlighted in orange have a bus currently scheduled to arrive next.'
                        }
                    </p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Bus Stop Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estimated Arrivals
                                        {selectedBus ? ` (Route ${selectedBus.route_number})` : ' (Route: Time)'}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {stopsForTable.map((stop, index) => {
                                    // Use isNextStopOverall for the row highlight regardless of single/all view mode
                                    const isNextStopOverall = stop.isNextStopOverall || stop.arrivals.some(a => a.isNextStop);

                                    return (
                                        <tr key={index} className={isNextStopOverall ? 'bg-orange-50/50 hover:bg-orange-100 transition-colors' : 'hover:bg-gray-50 transition-colors'}>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isNextStopOverall ? 'text-orange-700 font-bold' : 'text-gray-900'}`}>
                                                {stop.name}
                                                {isNextStopOverall && <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-orange-500 text-white rounded-full">NEXT</span>}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                    {stop.arrivals.map((arrival, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-xs px-2 py-1 rounded-full border ${arrival.isNextStop ? 'bg-orange-100 text-orange-600 border-orange-300 font-semibold' : 'bg-gray-100 text-gray-600 border-gray-200'}`}
                                                        >
                                                            {selectedBus ? arrival.arrival : `${arrival.route}: ${arrival.arrival}`}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="bg-gray-700 text-white mt-12 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center text-sm border-t border-gray-600 pt-4">
                        <p className="text-gray-300">&copy; {new Date().getFullYear()} Amanah Transport Services. All Rights Reserved.</p>
                        <div className="flex space-x-4 mt-3 sm:mt-0 text-gray-400">
                            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                            <span className="text-gray-500">|</span>
                            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
                            <span className="text-gray-500">|</span>
                            <a href="#" className="hover:text-green-400 transition-colors">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
