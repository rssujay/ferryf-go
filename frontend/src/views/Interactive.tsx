import React, { useState } from 'react'
import { Card } from 'primereact/card';
import Navbar from '../components/Navbar';
import items from '../constants/constants';

export default function Interactive() {
    const [activeElement, setActiveElement] = useState(items[0])
    const [stepNumber, setStepNumber] = useState(0)

    return (
        <Card>
            <Navbar activeElement={activeElement} setActiveElement={setActiveElement} />
            
        </Card>
    )
}
