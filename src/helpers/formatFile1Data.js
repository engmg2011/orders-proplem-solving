export default function formatFile1Data(file1Data){
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
        }))
        for(let i =0; i< formattedFile1Products.length ; i++)
            formattedFile1Data.push({'Product Name': formattedFile1Products[i],
                'Brand Name': formattedFile1Brands[i]})

    }
    return formattedFile1Data;
}
