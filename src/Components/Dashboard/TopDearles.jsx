import React, { useState, useEffect } from 'react'

const TopDearles = ({ WonStageDealers }) => {

    const [widths, setHeights] = useState([]);

    useEffect(() => {
        const initialWidth = WonStageDealers.map(Dealers => Dealers.percentage);
        setHeights(initialWidth);
    }, [WonStageDealers]);

    return (
        <div className='w-[529px] bg-white p-6 mt-[30px]'>
            <p className='text-[24px] font-medium'>Top dealers</p>

            <div className='w-[465px] pt-[40px]'>
                {
                    WonStageDealers &&
                    WonStageDealers.map((oneMap, index) => {
                        const width = widths[index] || 0;

                        return (
                            <div className='pb-[45px]' key={index}>
                                <div className='flex justify-between items-center pb-[15px]'>
                                    <p className='font-medium'>{oneMap.userName} {oneMap.userSurname}</p>
                                    <span className='text-[#7C838B]'>{oneMap.percentage}%</span>
                                </div>
                                <div className="w-full h-4 bg-[#CDE7FF] rounded-full">
                                    <div
                                        className={`h-full bg-[#006AFF] rounded-full transition-all duration-300`}
                                        style={{ width: `${width}%` }}
                                    ></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopDearles
