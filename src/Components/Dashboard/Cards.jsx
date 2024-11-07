import React from 'react'
import ProbabltySvg from '../../Assets/Img/PropobaltySvg.svg'
import Up from '../../Assets/Img/Up.svg'
import Lost from '../../Assets/Img/Lost.svg'
import WonLogo from '../../Assets/Img/Won.svg'
import LostLogo from "../../Assets/Img/LostLogo.svg"
import ProductDashbord from "../../Assets/Img/ProductDashbord.svg"
import CountUp from 'react-countup';

const Cards = ({ Probablity, InformationWonLost }) => {
    return (
        <div className="flex justify-evenly">

            <div className="bg-white w-[252px] h-[172px]  p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className='w-full flex flex-col justify-evenly h-full'>
                    <div className='flex justify-between items-center w-full'>
                        <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Won</p>
                        <div>
                            <img src={WonLogo} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold">${InformationWonLost && InformationWonLost.won_Total_Revenue ? < CountUp start={0} end={InformationWonLost.won_Total_Revenue} duration={2.75} /> : '0'}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white w-[252px]   h-[172px] p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className='w-full flex flex-col justify-evenly h-full'>
                    <div className='flex justify-between w-full items-center'>
                        <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Lost</p>
                        <div>
                            <img src={LostLogo} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[34px] font-semibold">${InformationWonLost && InformationWonLost.lost_Total_Revenue ? <CountUp start={0} end={InformationWonLost.lost_Total_Revenue} duration={2.75} /> : '0'}</p>
                    </div>
                </div>

            </div>

            <div className="bg-white w-[252px]  h-[172px] p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className='w-full flex flex-col justify-evenly h-full'>
                    <div className='flex justify-between w-full items-center'>
                        <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Product sold</p>
                        <div>
                            <img src={ProductDashbord} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold">{InformationWonLost && InformationWonLost.won_Leads_Count ? <CountUp start={0} end={InformationWonLost.won_Leads_Count} duration={2.75} /> : '0'}</p>
                    </div>
                </div>

            </div>

            <div className="bg-white w-[252px]   h-[172px] p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div className='w-full flex flex-col justify-evenly h-full'>
                    <div className='flex justify-between w-full items-center'>
                        <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Probability</p>
                        <div>
                            <img src={ProbabltySvg} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                        </div>
                    </div>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold"><CountUp start={0} end={Probablity} duration={2.75} />%</p>
                    </div>
                </div>
            </div>

            <div className="bg-white w-[252px]   h-[172px] p-3 sm:p-4 rounded-lg shadow-md flex flex-col justify-center ">
                <p className='text-[26px]'>Conversion rate</p>
                <p className='text-[26px] text-[#1971F6] pt-[20px]'>{InformationWonLost && InformationWonLost.conversion_Rate ? <CountUp start={0} end={InformationWonLost.conversion_Rate} duration={2.75} /> : '0'}%</p>
            </div>

        </div>

    )
}

export default Cards
