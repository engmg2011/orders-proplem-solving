export default function file1(file1_orders ){
    const setFile1Data = (productName, brandName , file1_orders) => {
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
        return file1_orders;
    }
    return { file1_orders, setFile1Data}
}