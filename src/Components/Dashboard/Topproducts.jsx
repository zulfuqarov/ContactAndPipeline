import React, { useState, useEffect } from 'react';

const Topproducts = ({ topProduct }) => {


    const [widths, setHeights] = useState([]);

    useEffect(() => {
        const initialWidth = topProduct.map(Dealers => Dealers.percentage);
        setHeights(initialWidth);
    }, [topProduct]);

    return (
        <div className="w-[440px] flex flex-col justify-evenly items-center bg-white min-h-[286px] border">
            <p className='font-medium w-[410px] text-left text-[22px] '>Top products</p>

            <div className='w-[410px] flex flex-col  space-y-4 '>
                {
                    topProduct &&
                    topProduct.map((product, index) => {
                        const width = widths[index] || 0;

                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center "
                            >

                                <p className="text-[16px] text-[#031225]">{product.productName}</p>

                                <div className="w-[304px]">
                                    <div className='h-[23px] rounded bg-[#6A8BF7] transition-all duration-300 ease-in-out'
                                        style={{ width: `${width}%` }}
                                    >

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                <div className='w-full'>
                    <div className='flex justify-between items-center text-[12px] float-end w-[304px] text-[#7C838B]'>
                        <span>0%</span>
                        <span>10%</span>
                        <span>25%</span>
                        <span>40%</span>
                        <span>55%</span>
                        <span>70%</span>
                        <span>85%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topproducts
