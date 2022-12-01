import './App.css';
import CSVReader from "./components/CSVReader";

function App() {

    const readData = (data) => {
        console.log(data);
        const headers = ['Id', 'Area', 'Name', 'Quantity', 'Brand'];
        const totalOrdersCount = data.length;
        const file0_order_names = [];
        const file0_order_count = [];
        const file0_order_average = [];


        data.forEach((order) => {
            const name = order[headers.indexOf('Name')];
            const quantity = parseFloat(order[headers.indexOf('Quantity')]);

            // First file
            const orderIndex = file0_order_names.indexOf(name);
            if (orderIndex === -1) {
                file0_order_names.push(name)
                file0_order_count.push(quantity);
                file0_order_average.push(quantity/totalOrdersCount);
            } else {
                file0_order_count[orderIndex] = file0_order_count[orderIndex] + quantity;
                file0_order_average[orderIndex] = file0_order_count[orderIndex] / totalOrdersCount;
            }

            // Second file



        })

        console.log(file0_order_names, file0_order_count,file0_order_average);

    }

    return (
        <div className="App">
            <CSVReader setData={readData}/>
        </div>
    );
}

export default App;
