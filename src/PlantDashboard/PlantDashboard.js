import React from "react";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

import "./PlantDashboard.css";
import Gauge from './Gauge/Gauge'
import { GetReadings } from "../utils/serverRequests";

export default function Dashboard() {

    const [plants, setPlants] = useState([])

    async function getData() {
        const response = await GetReadings()
        const data = await response.json()

        setPlants(data.plants_array)
    }

    function historyRedirect(plantId) {
        const url = 'history/' + plantId
        window.location.assign(url);
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="gauge-wrapper">
            {plants.map((val, id) => (
            <div className="gauge-button-wrapper" key={id}>
                <div className="gauge">
                    <Gauge
                        plantName={val.plant_name}
                        roomName={val.room_name}
                        roomLocation={val.room_location}
                        moisturePercentage={val.moisture_percentage}
                        imageUrl={val.image_url}
                    />
                </div>
                <div className="Button">
                    <Button
                        variant="contained"
                        onClick={() => historyRedirect(val.id)}
                    >
                        History
                    </Button>
                </div>
            </div>
            ))}
        </div>
    );
};