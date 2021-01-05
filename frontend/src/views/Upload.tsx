import React from 'react'
import { FileUpload } from 'primereact/fileupload';
import {Steps} from 'primereact/steps';
import axios from 'axios';

export default function Upload() {
    // const [stepNumber, setStepNumber] = useState(0)

    const items = [
        {label: 'Choose file'},
        {label: 'Confirmation'},
        {label: 'Share link'},
    ];

    const uploadHandler = async (event: any) => {
        try {
            if (event.files.length !== 1) {
                throw new Error("Incorrect number of files selected")
            }

            const response = await axios.post("/api/v1/filedata", { name : event.files[0].name })
            if (response.status !== 200 || !response.data.URL) {
                throw new Error("API call failed")
            }

            const formData = new FormData()
            formData.append('file', event.files[0])
            
            const sendFile = await axios.post(
                `/api/v1/files/${response.data.URL}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' }}
                )
            if (sendFile.status !== 200) {
                throw new Error("File upload failure")
            }
            // const response = await axios.post('/api/v1/filedata', { name: event.files })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Steps model={items} />
            <FileUpload maxFileSize={2000000} customUpload uploadHandler={uploadHandler} />
        </div>
    )
}
