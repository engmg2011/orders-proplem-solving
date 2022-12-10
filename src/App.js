import './App.css';
import CSVReader from "./components/CSVReader";
import CSVDownloader from "./components/CSVDownloader";
import {useState} from "react";
import bufferAverageFileData from "./helpers/averageData";
import mostSoldData from "./helpers/mostSoldData";

function App() {
    const [fileName, setFileName] = useState('');
    const [averageFileData, setAverageFileData] = useState(null);
    const [mostSoldFileData, setMostSoldFileData] = useState(null);

    let mostSold = [];

    /**
     * Converting read data to valued structure
     * **/
    const setData = (data) => {
        const totalOrdersCount = data.length;
        let averageFile = {
            names: [],
            count: [],
            average: [],
            downloadData: []
        }

        /**
         *  Could be separated to two iterations in two files for simplicity
         *  but used one only for better performance
         */
        data.forEach((order) => {
            bufferAverageFileData(averageFile,order,totalOrdersCount);
            mostSoldData(mostSold, order)
        })
        setAverageFileData(averageFile['downloadData']);
        setMostSoldFileData(mostSold.map(m => ({'product':m.name, 'brand': m.mostSold  })));
    }
    return (
        <div className="App">
            <CSVReader setFileName={setFileName} setData={setData}/>
            {
                averageFileData &&
                <CSVDownloader filename={fileName} file0Data={averageFileData} file1Data={mostSoldFileData}/>
            }
        </div>
    );
}

export default App;
