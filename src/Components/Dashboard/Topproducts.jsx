import React, { useState, useEffect } from 'react';

const Topproducts = ({ topProduct }) => {

    const [heights, setHeights] = useState([]);

    useEffect(() => {
        const initialHeights = topProduct.map(product => (product.percentage * 363) / 100);
        setHeights(initialHeights);
    }, [topProduct]);



    return (
        <div className='w-[450px] h-[600px] p-7 flex flex-col justify-center bg-white  items-center mt-[25px]'>

            <p className='font-bold text-left w-full text-[24px] '>Top products</p>

            <div className='flex gap-3 items-end h-[100%] mt-[30px] w-full relative'>
                {topProduct &&
                    topProduct.map((oneMap, index) => {
                        const height = heights[index] || 0; // Yüksekliği state'den al
                        return (
                            <div key={index} className='flex flex-col items-center justify-end h-full'>
                                <div
                                    className='w-[32px] rounded bg-[#6A8BF7] transition-all duration-300 ease-in-out'
                                    style={{ height: `${height}px` }}
                                ></div>
                                <p className='writing-mode-vertical font-[500] text-lg mt-2'>{oneMap.productName}</p>
                            </div>
                        );
                    })}


                <div className='flex flex-col h-[76%] justify-between absolute right-0 top-0'>
                    <span>100%</span>
                    <span>85%</span>
                    <span>70%</span>
                    <span>55%</span>
                    <span>40%</span>
                    <span>25%</span>
                    <span>10%</span>
                    <span>0%</span>
                </div>
            </div>
        </div>
    )
}

export default Topproducts
