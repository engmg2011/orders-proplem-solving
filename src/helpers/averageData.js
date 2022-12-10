import headers from "./headers";

export default function bufferAverageFileData(averageFile, order, totalOrdersCount){
    const productName = order[headers.indexOf('Name')];
    const quantity = parseFloat(order[headers.indexOf('Quantity')]);
    const orderIndex = averageFile['names'].indexOf(productName);
    if (orderIndex === -1) {
        averageFile['names'].push(productName)
        averageFile['count'].push(quantity);
        let average = quantity / totalOrdersCount;
        averageFile['average'].push(quantity / totalOrdersCount);
        averageFile['downloadData'].push({'Name': productName, 'Average': average})
    } else {
        averageFile['count'][orderIndex] = averageFile['count'][orderIndex] + quantity;
        averageFile['average'][orderIndex] = averageFile['count'][orderIndex] / totalOrdersCount;
        averageFile['downloadData'][orderIndex]['Average'] = averageFile['average'][orderIndex];
    }
}