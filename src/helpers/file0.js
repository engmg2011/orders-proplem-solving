export default function file0(data){

    const totalOrdersCount = data.length;
    const file0_order_names = [];
    const file0_order_count = [];
    const file0_order_average = [];

    const setFile0Data = (productName, quantity) => {
        console.log("will set 0")
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
    console.log("file0_order_names", file0_order_names)
    return {setFile0Data, file0_order_names , file0_order_average};
}
