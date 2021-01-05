import React, { useState } from 'react'
import { Card } from 'primereact/card';
import Navbar from '../components/Navbar';
import { NAV_LABELS } from '../constants/constants';
import Content from './Content';

export default function Interactive() {
    const [activeElement, setActiveElement] = useState(NAV_LABELS[0])

    return (
        <Card style={{width: "70vw", margin: "2vmax" }}>
            <Navbar activeElement={activeElement} setActiveElement={setActiveElement} />
            <Content activeElement={activeElement} />
        </Card>
    )
}
