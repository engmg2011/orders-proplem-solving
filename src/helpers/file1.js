export default function file1(file1_orders) {
    const setFile1Data = (productName, brandName, file1_orders) => {
        let productData = file1_orders.find(o => o.name === productName);
        let brandData = {brandName: brandName, soldCount: 1};
        if (!productData)
            file1_orders.push({name: productName, data: [brandData]})
        else {
            const oldBrandData = productData.data.find(p => (p.brandName === brandName));
            if (oldBrandData) {
                productData.data.map((bd) => {
                    if (bd.brandName === brandName)
                        bd.soldCount = oldBrandData.soldCount + 1;
                    return bd;
                })
            }
            file1_orders.map(pd => {
                if(pd.name === productName)
                    pd = productData;
                return pd;
            })
        }
        return file1_orders;
    }
    return {file1_orders, setFile1Data}
}