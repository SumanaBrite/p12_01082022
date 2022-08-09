import './ActivityChartTooltip.css'
import React from 'react'

export default function ActivityChartTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      return (
        <div className="tooltipActivity">
          <p className="labelActivity">{`${payload[0].value} kg`}</p>
          <p className="labelActivity">{`${payload[1].value} kCal`}</p>
        </div>
      )
    }
    return null
  }