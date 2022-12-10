import headers from "./headers";

export default function mostSoldData(file1_orders, order){

    const productName = order[headers.indexOf('Name')];
    const brandName = order[headers.indexOf('Brand')];

    let productData = file1_orders.find(o => o.name === productName);
    let brandData = {brandName: brandName, soldCount: 1};
    if (!productData)
        file1_orders.push({name: productName, data: [brandData], mostSold: brandData.brandName})
    else {
        const oldBrandData = productData.data.find(p => (p.brandName === brandName));
        if (oldBrandData) {
            let max = 0;
            productData.data.map((bd) => {
                if (bd.brandName === brandName)
                    bd.soldCount = oldBrandData.soldCount + 1;
                if(bd.soldCount > max) {
                    productData.mostSold = bd.brandName;
                    max = bd.soldCount
                }
                return bd;
            })
        }else{
            productData.data.push({...brandData})
        }
        file1_orders.map(pd => {
            if(pd.name === productName)
                pd = productData;
            return pd;
        })
    }
    return file1_orders;
}