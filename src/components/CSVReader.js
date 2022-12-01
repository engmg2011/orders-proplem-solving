import React from 'react';
import {useCSVReader} from 'react-papaparse';
import styles from '../styles/csvReaderStyles';

export default function CSVReader({setData}) {

    const {CSVReader} = useCSVReader();

    const uploadAccepted = (results) => {
        setData(results.data);
    }

    return (
        <CSVReader onUploadAccepted={uploadAccepted}>
            {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps,
              }) => (
                <>
                    <div style={styles.csvReader}>
                        <button type='button' {...getRootProps()} style={styles.browseFile}>
                            Browse file
                        </button>
                        <div style={styles.acceptedFile}>
                            {acceptedFile && acceptedFile.name}
                        </div>
                        <button {...getRemoveFileProps()} style={styles.remove}>
                            Remove
                        </button>
                    </div>
                    <ProgressBar style={styles.progressBarBackgroundColor}/>
                </>
            )}
        </CSVReader>
    );
}