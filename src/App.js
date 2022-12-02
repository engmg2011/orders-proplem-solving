import './App.css';
import CSVReader from "./components/CSVReader";
import CSVDownloader from "./components/CSVDownloader";
import {useState} from "react";
import headers from "./helpers/headers";
import file0 from "./helpers/file0";
import file1 from "./helpers/file1";

function App() {
    const [fileName, setFileName] = useState('');
    const [file0Data, setFirstFileData] = useState(null);
    const [file1Data, setSecondFileData] = useState(null);

    const setData = (data) => {
        let {setFile0Data, file0_order_names , file0_order_average} = file0(data,file0Data,setFirstFileData);
        let {file1_orders, setFile1Data} = file1([])

        data.forEach((order) => {
            const productName = order[headers.indexOf('Name')];
            const quantity = parseFloat(order[headers.indexOf('Quantity')]);
            const brandName = order[headers.indexOf('Brand')];

            // First file
            setFile0Data(productName, quantity);

            // Second file
            file1_orders = setFile1Data(productName, brandName, file1_orders)

        })
        setFirstFileData({names: file0_order_names, average: file0_order_average});
        setSecondFileData(file1_orders);
    }
    return (
        <div className="App">
            <CSVReader setFileName={setFileName} setData={setData}/>
            {
                file0Data &&
                <CSVDownloader filename={fileName} file0Data={file0Data} file1Data={file1Data}/>
            }
        </div>
    );
}

export default App;
