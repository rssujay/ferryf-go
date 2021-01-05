import { Steps } from 'primereact/steps';
import { useState } from 'react';
import ShareStep from './ShareStep';
import UploadStep from './UploadStep';


export default function Upload() {
    const [stepIdx, setStepIdx] = useState(0)
    const [URL, setURL] = useState('')

    const items = [
        {label: 'Upload file'},
        {label: 'Share link'},
    ];

    return (
        <div>
            <Steps model={items} activeIndex={stepIdx} />
            <br />
            { stepIdx === 0 ? <UploadStep setStepIdx={setStepIdx} setURL={setURL} /> : <ShareStep URL={URL} /> }
        </div>
    )
}
