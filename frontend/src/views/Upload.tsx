import React from 'react'
import { FileUpload } from 'primereact/fileupload';
import {Steps} from 'primereact/steps';

export default function Upload() {
    // const [stepNumber, setStepNumber] = useState(0)

    const items = [
        {label: 'Choose file'},
        {label: 'Confirmation'},
        {label: 'Share link'},
    ];

    return (
        <div>
            <Steps model={items} />
            <FileUpload />
        </div>
    )
}
