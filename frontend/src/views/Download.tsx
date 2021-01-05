import { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import { PARTIAL_FILE_ENDPOINT } from '../constants/constants';

type DownloadProps = { };
type DownloadState = { 
        pathName: string
    };

export default class Download extends Component<DownloadProps, DownloadState> {
    constructor(props: any) {
        super(props)
        console.log(window.location)
        this.state = {
            pathName: (window.location.pathname || '').replace('/', ''),
        }
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
                <a 
                href={this.state.pathName === '' ? '#' : `${PARTIAL_FILE_ENDPOINT}${this.state.pathName}`} 
                download
                style={this.state.pathName === '' ? { textDecoration: 'none', color: 'red' } : { textDecoration: 'none', color: '#007bff' }}
                >
                   {this.state.pathName === '' ? 'Fill in the URL above' : 'Download' }
                </a>  
            </div>
        )
    }
}

