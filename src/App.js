import './App.css';
import CSVReader from "./components/CSVReader";
import CSVDownloader from "./components/CSVDownloader";
import {useState} from "react";
import headers from "./helpers/headers";
import setFile0Data from "./helpers/setFile0Data";
import {setFile1Data} from "./helpers/setFile1Data";

function App() {
    const [fileName, setFileName] = useState('');
    const [file0Data, setFirstFileData] = useState(null);
    const [file1Data, setSecondFileData] = useState(null);

    let file1_orders = [];

    /**
     * Converting read data to valued structure
     * **/
    const setData = (data) => {
        /**
         * file0_order_names: Array of names
         * file0_order_average: Array of averages
         */
        let {updateFile0Data, file0_order_names, file0_order_average} = setFile0Data(data, file0Data, setFirstFileData);
        // Could be separated to two iterations but one only for performance
        data.forEach((order) => {
            const productName = order[headers.indexOf('Name')];
            const quantity = parseFloat(order[headers.indexOf('Quantity')]);
            const brandName = order[headers.indexOf('Brand')];
            /**
             * File 0
             * returned structure file0Data ex :
             * {"names":["Intelligent Copper Knife","Small Granite Shoes"],"average":[2.4,0.8]}
             */
            updateFile0Data(productName, quantity);

            /**
             * File 1
             * returned structure file1Data ex:
             * [{"name":"Intelligent Copper Knife","data":[{"brandName":"Hilll-Gorczany","soldCount":3}]}]
             */
            setFile1Data(productName, brandName, file1_orders)

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
