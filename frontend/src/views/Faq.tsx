import { Panel } from 'primereact/panel';

export default function Faq() {
    return (
        <div>
            <Panel header="What is ferryf?" toggleable collapsed>
                <p>
                    ferryf is a proof of concept (POC) application to share files via the web without needing to sign in or install additional software.
                    Users can upload a file (of size 2 MiB and below), and a link that can be used to download the file for the next 24 hours will be generated.
                </p>
                <p>
                    ferryf aims to solve one-time sharing of files between devices, where it may not be as efficient to use conventional means e.g. setup connections / software.
                </p>
                <br />
                <p>
                    ferryf does not aim to compete with any professional file storage/sharing services and should not be considered as one.
                </p>

                <br />
                <p>Built with: Typescript, React, Golang, Nginx</p>
            </Panel>
            <Panel header="Upcoming features" toggleable collapsed>
                <p>Associate an optional password before the file can be downloaded</p>
                <p>User-initiated file deletes from servers on download</p>
            </Panel>
            <Panel header="Security considerations" toggleable collapsed>
                <p>Files are auto-deleted 24 hours after upload. Anyone with the correct link can access and download the associated file while it exists.</p>
            </Panel>
            <Panel header="Guarantees/Liabilities" toggleable collapsed>
                <p>
                    Absolutely none, since this project is unmaintained.<br /><br />
                    By using this service, you acknowledge that you are using ferryf at your own risk.
                    You will not hold the developer liable for any reason, e.g. loss or misuse of data.
                </p>
            </Panel>
        </div>

    )
}
