import React from 'react';
import {useCSVReader} from 'react-papaparse';
import styles from '../styles/csvReaderStyles';

export default function CSVReader({setData , setFileName}) {
    const {CSVReader} = useCSVReader();


    const uploadAccepted = (results) => {
        setData(results.data);
    }

    return (
        <div className="csv-upload">
            <div className="title">Choose the orders csv file:</div>
            <CSVReader onUploadAccepted={uploadAccepted}>
                {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                  }) => {
                    if(acceptedFile){
                        // Setting file name without extension
                        setTimeout(()=> setFileName(acceptedFile.name.replace(/\.[^/.]+$/, "")));
                    }
                    return (
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
                    )
                }}
            </CSVReader>
        </div>

    );
}