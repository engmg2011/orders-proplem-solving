import React, {useState} from 'react';

export default function FileUpload({processFile}){
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const changeHandler = (event) => {
        setIsSelected(true);
        processFile(event.target.files[0]);
        setSelectedFile(event.target.files[0]);
    };

    return(
        <div className="file-upload-form" >
            <label htmlFor="file"> Please choose orders csv file </label>
            <input type="file" name="file"
                   accept=".csv" onChange={changeHandler} />
            {isSelected && (
                <div className="file-info">
                    <p>Filename: {selectedFile.name}</p>
                    <p>Filetype: {selectedFile.type}</p>
                    <p>Size: {selectedFile.size} bytes</p>
                </div>
            )}
        </div>
    )
}
