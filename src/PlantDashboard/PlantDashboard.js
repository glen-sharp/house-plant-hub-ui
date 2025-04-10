import React from "react";
import { useState, useEffect } from "react";

import "./PlantDashboard.css";
import Gauge from './Gauge/Gauge'
import { GetReadings } from "../utils/serverRequests";

export default function Dashboard() {

    const [plants, setPlants] = useState([])

    async function getData() {
        const response = await GetReadings()
        const data = await response.json()

        setPlants(data.plants_array)

        console.log(data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="gauge-wrapper">
            {plants.map((val, id) => (
            <div className="gauge" key={id}>
                <Gauge
                    plantName={val.plant_name}
                    roomName={val.room_name}
                    roomLocation={val.room_location}
                    moisturePercentage={val.moisture_percentage}
                />
            </div>
            ))}
        </div>
    );
};