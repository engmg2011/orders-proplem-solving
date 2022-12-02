import React, {useEffect} from 'react';

import {useCSVDownloader} from 'react-papaparse';

let effected = false;

export default function CSVDownloader({filename, file0Data, file1Data}) {
    const {CSVDownloader, Type} = useCSVDownloader();

    let formattedFile0Data = [];
    let formattedFile1Data = [];

    console.log("download data");
    useEffect(function (){
        if(!effected){

            if (file0Data) {
                for (let i = 0; i < file0Data.names.length; i++) {
                    formattedFile0Data.push({'Name': file0Data.names[i], 'Average': file0Data.average[i]})
                }
            }

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
            effected = true;
        }
    },[])

    return (<>
            <CSVDownloader
                type={Type.Button}
                filename={'0_' + filename}
                bom={true}
                config={{
                    header: false,
                }}
                data={formattedFile0Data}
            >
                Download First File
            </CSVDownloader>

            <CSVDownloader
                type={Type.Button}
                filename={'1_' + filename}
                bom={true}
                config={{
                    header: false,
                }}
                data={formattedFile1Data}
            >
                Download Second File
            </CSVDownloader>
        </>
    );
}