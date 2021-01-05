import { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { PARTIAL_FILE_ENDPOINT } from '../constants/constants';
import axios from 'axios';

type DownloadProps = { };
type DownloadState = { 
        pathName: string
    };

export default class Download extends Component<DownloadProps, DownloadState> {
    constructor(props: any) {
        super(props)
        this.state = {
            pathName: (window.location.pathname || '').replace('/', ''),
        }
    }

    downloadFile: any = async () => {
        const { pathName } = this.state
        const response = await axios.get(`${PARTIAL_FILE_ENDPOINT}${pathName}`, { responseType: "blob" })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', response.request.getResponseHeader('Content-Disposition').split('"')[1])
        document.body.appendChild(link)
        link.click()
    }

    render() {
        return (
            <div>
                <p>
                    {window.location.host}&nbsp;/&nbsp;
                    <InputText value={this.state.pathName} onChange={e => {
                        const target = e.target as HTMLTextAreaElement
                        this.setState({ pathName: target.value })
                    }} />
                </p>
                <br />
                <Button
                    label={this.state.pathName === '' ? "Empty link" : "Download"} 
                    icon="pi pi-download" 
                    disabled={this.state.pathName === ''}
                    onClick={this.downloadFile}
                />
            </div>
        )
    }
}

