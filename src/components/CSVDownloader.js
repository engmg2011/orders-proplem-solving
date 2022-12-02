import React, {useEffect, useState} from 'react';

import {useCSVDownloader} from 'react-papaparse';
import formatFile0Data from "../helpers/formatFile0Data";
import formatFile1Data from "../helpers/formatFile1Data";


export default function CSVDownloader({filename, file0Data, file1Data}) {
    const {CSVDownloader, Type} = useCSVDownloader();
    const [formattedFile0Data, setFormattedFile0Data] = useState(null);
    const [formattedFile1Data, setFormattedFile1Data] = useState(null);

    useEffect(function () {
        setFormattedFile0Data(formatFile0Data(file0Data))
        setFormattedFile1Data(formatFile1Data(file1Data));
    }, [file0Data, file1Data])

    return (<div className="downloader">
            <CSVDownloader
                type={Type.Button}
                filename={'0_' + filename}
                bom={true}
                config={{
                    header: false,
                }}
                data={formattedFile0Data}
            >
                Download First File
            </CSVDownloader>
            <CSVDownloader
                type={Type.Button}
                filename={'1_' + filename}
                bom={true}
                config={{
                    header: false,
                }}
                data={formattedFile1Data}
            >
                Download Second File
            </CSVDownloader>
        </div>
    );
}