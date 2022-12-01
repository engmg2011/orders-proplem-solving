import './App.css';
import FileUpload from "./components/FileUpload";
import {useRef} from "react";

function App() {
    let fileInfo = useRef(null);
    const processFile = (file) => {
        // Checking modern browsers
        if ( !(window.File && window.FileReader && window.FileList && window.Blob) )
            alert("Please use browser supports HTML5 File API");

        const reader = new FileReader();
        if (!file.type.match(/text.csv/))
            fileInfo.current.innerHTML = "<span class='error'>It doesn't seem to be a text file!</span>";

        reader.onload = (event) => {
            fileInfo.current.innerHTML = event.target.result;
        }
        reader.readAsText(file);

    }

    return (
        <div className="App">
            <FileUpload processFile={processFile}/>

            <div ref={fileInfo}>


            </div>
        </div>
    );
}

export default App;
