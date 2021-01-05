type ShareStepProps = {
    URL: string,
}


export default function ShareStep(props: ShareStepProps) {
    return (
        <div>
            <h4>
                Your file can be downloaded at&nbsp;
                <a 
                href={`${window.location.href}${props.URL}`}
                style ={{ color: '#007bff', textDecoration: 'none' }}
                >
                    {window.location.href}{props.URL}
                </a>
            </h4>
        </div>
    )
}
