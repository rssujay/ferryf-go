import { FileUpload } from 'primereact/fileupload';
import { PARTIAL_FILE_ENDPOINT, FILEDATA_ENDPOINT, FILE_KEY, MAX_FILE_SIZE } from '../../constants/constants'
import axios from 'axios';


type UploadStepProps = {
    setStepIdx: any,
    setURL: any,
}

export default function UploadStep(props: UploadStepProps) {
    const uploadHandler = async (event: any) => {
        try {
            if (event.files.length !== 1) {
                throw new Error("Incorrect number of files selected")
            }

            const response = await axios.post(FILEDATA_ENDPOINT, { name : event.files[0].name })
            if (response.status !== 200 || !response.data.URL) {
                throw new Error("API call failed")
            }

            const formData = new FormData()
            formData.append(FILE_KEY, event.files[0])
            
            const sendFile = await axios.post(
                `${PARTIAL_FILE_ENDPOINT}${response.data.URL}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' }}
                )
            if (sendFile.status !== 200) {
                throw new Error("File upload failure")
            }
            props.setURL(response.data.URL)
            props.setStepIdx(1)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <FileUpload maxFileSize={MAX_FILE_SIZE} customUpload uploadHandler={uploadHandler} />
        </div>
    )
}
