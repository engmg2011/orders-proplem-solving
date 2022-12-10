import React from 'react';

/**
 * Used papa parse package for fixing characters encoding issues and
 * better performance in reading large files using chunking
 */
import {useCSVDownloader} from 'react-papaparse';

export default function CSVDownloader({filename, file0Data, file1Data}) {
    const {CSVDownloader, Type} = useCSVDownloader();

    return (<div className="downloader">
            <CSVDownloader
                type={Type.Button}
                filename={'0_' + filename}
                bom={true}
                config={{
                    header: false,
                }}
                data={file0Data}
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
                data={file1Data}
            >
                Download Second File
            </CSVDownloader>
        </div>
    );
}