import React, { useState } from 'react'
import { Card } from 'primereact/card';
import Navbar from '../components/Navbar';
import { NAV_LABELS } from '../constants/constants';
import Content from './Content';

export default function Interactive() {
    // redirect to downloads if arrived via link
    const [activeElement, setActiveElement] = useState(
        (window.location.pathname || '').replace('/', '') !== '' ? NAV_LABELS[1] : NAV_LABELS[0]
        )

    return (
        <Card style={{width: "70vw", margin: "2vmax" }}>
            <Navbar activeElement={activeElement} setActiveElement={setActiveElement} />
            <Content activeElement={activeElement} />
        </Card>
    )
}
