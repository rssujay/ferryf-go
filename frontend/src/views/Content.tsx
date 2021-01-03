import React from 'react'
import Download from './Download'
import Faq from './Faq'
import Upload from './Upload'

type ContentProps = {
    activeElement: any
}


export default function Content(props: ContentProps) {
    switch(props.activeElement.label) {
        case "Upload":
            return <Upload />
        case "FAQ":
            return <Faq />
        default:
            return <Download />
    }
}
