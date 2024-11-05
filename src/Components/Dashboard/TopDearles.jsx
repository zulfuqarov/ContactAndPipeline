import React, { useState, useEffect } from 'react'

const TopDearles = ({ WonStageDealers }) => {

    const [widths, setHeights] = useState([]);

    useEffect(() => {
        const initialWidth = WonStageDealers.map(Dealers => Dealers.percentage);
        setHeights(initialWidth);
    }, [WonStageDealers]);

    return (
        <div className='w-[420px] flex flex-col justify-evenly items-center min-h-[286px] bg-white   border'>
            <p className='text-[22px] w-[360px] font-medium'>Top dealers</p>

            <div className='w-[360px]'>
                {
                    WonStageDealers &&
                    WonStageDealers.map((oneMap, index) => {
                        const width = widths[index] || 0;

                        return (
                            <div className='pb-[25px]' key={index}>
                                <div className='flex justify-between items-center pb-[8px]'>
                                    <p className='font-medium '>{oneMap.userName} {oneMap.userSurname}</p>
                                    <span className='text-[#7C838B] '>{oneMap.percentage}%</span>
                                </div>
                                <div className="w-full h-[9px] bg-[#CDE7FF] rounded-full">
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
