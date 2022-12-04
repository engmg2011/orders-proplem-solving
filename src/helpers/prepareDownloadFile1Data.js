/**
 * This method changes format of file 1 data and chooses the most sold
 * @param file1Data ex: [{"name":"Intelligent Copper Knife","data":[{"brandName":"Hilll-Gorczany","soldCount":3}]},{"name":"Small Granite Shoes","data":[{"brandName":"Rowe and Legros","soldCount":1}]}]
 * @returns ex: [{"Product Name":"Intelligent Copper Knife","Brand Name":"Hilll-Gorczany"},{"Product Name":"Small Granite Shoes","Brand Name":"Rowe and Legros"}]
 */

export default function prepareDownloadFile1Data(file1Data){
    let formattedFile1Data = [];
    let formattedFile1Products = [];
    let formattedFile1Brands = [];
    let formattedFile1BrandsSoldCount = [];
    if (file1Data){
        file1Data.map(product => product.data.map( brand => {
            const existedIndex = formattedFile1Products.indexOf(product.name);
            if( existedIndex === -1){
                formattedFile1Products.push(product.name);
                formattedFile1Brands.push(brand.brandName);
                formattedFile1BrandsSoldCount.push(brand.soldCount);
            }else{
                if(brand.soldCount > formattedFile1BrandsSoldCount[existedIndex]) {
                    formattedFile1Brands[existedIndex] = brand.brandName;
                    formattedFile1BrandsSoldCount[existedIndex] = brand.soldCount;
                }
            }
            return brand;
        }))
        for(let i =0; i< formattedFile1Products.length ; i++)
            formattedFile1Data.push({'Product Name': formattedFile1Products[i],
                'Brand Name': formattedFile1Brands[i]})

    }
    return formattedFile1Data;
}
