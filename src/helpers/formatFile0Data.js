export default function formatFile0Data(file0Data){

    let formattedFile0Data = [];
    for (let i = 0; i < file0Data.names.length; i++) {
        formattedFile0Data.push({'Name': file0Data.names[i], 'Average': file0Data.average[i]})
    }
    return formattedFile0Data;
}
