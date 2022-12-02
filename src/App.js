import './App.css';
import CSVReader from "./components/CSVReader";
import CSVDownloader from "./components/CSVDownloader";
import {useState} from "react";

const headers = ['Id', 'Area', 'Name', 'Quantity', 'Brand'];

function App() {
    const [fileName, setFileName] = useState('');
    const [file0Data, setFirstFileData] = useState(null);
    const [file1Data, setSecondFileData] = useState(null);

    const readData = (data) => {
        const totalOrdersCount = data.length;
        const file0_order_names = [];
        const file0_order_count = [];
        const file0_order_average = [];

        let file1_orders = [];

        const setFile0Data = (productName, quantity) => {
            const orderIndex = file0_order_names.indexOf(productName);
            if (orderIndex === -1) {
                file0_order_names.push(productName)
                file0_order_count.push(quantity);
                file0_order_average.push(quantity / totalOrdersCount);
            } else {
                file0_order_count[orderIndex] = file0_order_count[orderIndex] + quantity;
                file0_order_average[orderIndex] = file0_order_count[orderIndex] / totalOrdersCount;
            }
        }

        const setFile1Data = (productName, brandName) => {
            let productData = file1_orders.find(o => o.name === productName);
            let brandData = {brandName: brandName, soldCount: 1};
            if (!productData)
                file1_orders.push({name: productName, data: [brandData]})
            else {
                const oldBrandData = productData.data.find(p => (p.brandName === brandName));
                if (oldBrandData) {
                    brandData.soldCount = oldBrandData.soldCount + 1;
                    productData = {
                        name: productName,
                        data: productData.data.filter(p => (p.brandName !== brandName))
                    }
                }
                productData.data.push(brandData);
                let res = file1_orders.filter(p => (p.name !== productName))
                res.push(productData)
                file1_orders = res;
            }
        }

        data.forEach((order) => {
            const productName = order[headers.indexOf('Name')];
            const quantity = parseFloat(order[headers.indexOf('Quantity')]);

            // First file
            setFile0Data(productName, quantity);

            // Second file
            const brandName = order[headers.indexOf('Brand')];
            setFile1Data(productName, brandName)

        })
        setFirstFileData({names: file0_order_names, average: file0_order_average});
        setSecondFileData(file1_orders);
    }
    return (
        <div className="App">
            <CSVReader setFileName={setFileName} setData={readData}/>
            {
                file0Data &&
                <CSVDownloader filename={fileName} file0Data={file0Data} file1Data={file1Data}/>
            }
        </div>
    );
}

export default App;
