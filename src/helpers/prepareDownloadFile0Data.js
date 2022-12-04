/**
 * This method changes format of file 0 data
 * @param file0Data ex : {"names":["Intelligent Copper Knife","Small Granite Shoes"],"average":[2.4,0.8]}
 * @returns ex : [{"Name":"Intelligent Copper Knife","Average":2.4},{"Name":"Small Granite Shoes","Average":0.8}]
 */

export default function prepareDownloadFile0Data(file0Data){
    let formattedFile0Data = [];
    for (let i = 0; i < file0Data.names.length; i++) {
        formattedFile0Data.push({'Name': file0Data.names[i], 'Average': file0Data.average[i]})
    }
    return formattedFile0Data;
}
