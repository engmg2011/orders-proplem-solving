import React, {useEffect, useState} from 'react';

/**
 * Used papa parse package for fixing characters encoding issues and
 * better performance in reading large files using chunking
 */
import {useCSVDownloader} from 'react-papaparse';
import prepareDownloadFile0Data from "../helpers/prepareDownloadFile0Data";
import prepareDownloadFile1Data from "../helpers/prepareDownloadFile1Data";


export default function CSVDownloader({filename, file0Data, file1Data}) {
    const {CSVDownloader, Type} = useCSVDownloader();
    const [formattedFile0Data, setFormattedFile0Data] = useState(null);
    const [formattedFile1Data, setFormattedFile1Data] = useState(null);

    useEffect(function () {
        setFormattedFile0Data(prepareDownloadFile0Data(file0Data))
        setFormattedFile1Data(prepareDownloadFile1Data(file1Data));
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