import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { LineChart } from '@mui/x-charts/LineChart';

import dayjs from "dayjs";

import { GetReadingHistory } from "../utils/serverRequests";
import "./ReadingHistory.css"

export default function ReadingHistory() {
    const { plantId } = useParams();

    const [recordHistory, setRecordHistory] = useState([]);
    const [dateHistory, setDateHistory] = useState([]);
    const [tickDates, setTickDates] = useState([]);

    async function getData(plantId) {
        const response = await GetReadingHistory(plantId);
        const data = await response.json();

        setRecordHistory(data.moisture_readings)

        setTickDates(data.moisture_readings.map(record => {
            return dayjs(record.reading_datetime).format("YYYY-MM-DD");
        }))

    }

    useEffect(() => {
        getData(plantId)
    }, [])

    return (
        <div className="line-chart-div">
            <LineChart
                xAxis={[{
                    scaleType: "time",
                    data: recordHistory.map((v) => new Date(v.reading_datetime)),
                    label: "Date",
                    tickInterval: [...new Set(tickDates)].map(date => dayjs(date)),
                }]}
                series={[{
                    data: recordHistory.map((v) => v.moisture_percentage),
                    showMark: false,
                    valueFormatter: value => value + "%",
                    curve: 'natural',
                }]}
                yAxis={[{
                    label: "Moisture (%)",
                    width: 10,
                    domainLimit: (min, max) => ({
                        min: 0,
                        max: 100,
                    })
                }]}
                height={300}
                skipAnimation
                grid={{ horizontal: true, vertical: true }}
                slotProps={{ tooltip: { trigger: 'none' } }}
            />
        </div>
    )
};