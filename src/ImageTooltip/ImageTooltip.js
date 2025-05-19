import React from "react";

import "./ImageTooltip.css"

export default function ImageTooltip({ imageUrl }) {
    return (
        <div className="tooltip-wrapper" >
            <div className="tooltip-top" />
            <div className="tooltip-box">
                <img className="image" src={imageUrl} alt="Plant" />
            </div>
        </div>
    )
};