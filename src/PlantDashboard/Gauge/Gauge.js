import React from "react";
import GaugeComponent from 'react-gauge-component';

import { useState } from "react";

import { maxGaugeValue, minGaugeValue } from '../../utils/constants'
import ImageTooltip from "../../ImageTooltip/ImageTooltip";


export default function EmissionsPage({
    plantName,
    roomName,
    roomLocation,
    moisturePercentage,
    imageUrl
}) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div style={{ width: '100%', backgroundColor: '#282C35' }}>
            <GaugeComponent
                arc={{
                    width: 0.2,
                    padding: 0.005,
                    cornerRadius: 1,
                    subArcs: [
                        {
                            limit: 33,
                            color: '#EA4228',
                            tooltip: {
                                text: 'Needs watering ASAP!'
                            },
                        },
                        {
                            limit: 66,
                            color: '#F5CD19',
                            tooltip: {
                                text: 'Water soon'
                            },
                        },
                        {
                            limit: 100,
                            color: '#5BE12C',
                            tooltip: {
                                text: 'All watered out'
                            },
                        }
                    ]
                }}
                value={moisturePercentage}
                minValue={minGaugeValue}
                maxValue={maxGaugeValue}
                labels={{
                    tickLabels: {
                        ticks: [
                            { value: 33 },
                            { value: 66 }
                        ],
                    },
                }}
            />
            <div>
                <h1
                    style={{ color: 'white', textAlign: 'center', margin: 5 }}
                    onMouseEnter={() => setIsVisible(true)}
                    onMouseLeave={() => setIsVisible(false)}    
                >
                    {plantName}
                    {isVisible && <ImageTooltip imageUrl={imageUrl} />}
                </h1>
                <h2 style={{ color: 'white', textAlign: 'center', margin: 0 }}>
                    {roomName}: {roomLocation}
                </h2>
            </div>
        </div>
    );
};