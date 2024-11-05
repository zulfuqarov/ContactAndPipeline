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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 p-3">

            <div className="bg-white h-full p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Won</p>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold">${InformationWonLost && InformationWonLost.won_Total_Revenue ? < CountUp start={0} end={InformationWonLost.won_Total_Revenue} duration={2.75} /> : ''}</p>
                        <p className="flex pt-1 text-xs sm:text-sm">
                            <span className="text-[#D30707] flex items-center mr-1">
                                <img src={Lost} alt="Up arrow" className="w-3 h-3 mr-1" /> 0.5%
                            </span>
                            from last month
                        </p>
                    </div>
                </div>
                <div>
                    <img src={WonLogo} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
            </div>

            <div className="bg-white h-full p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Lost</p>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[34px] font-semibold">{InformationWonLost && InformationWonLost.lost_Total_Revenue ? <CountUp start={0} end={InformationWonLost.lost_Total_Revenue} duration={2.75} /> : ''}</p>
                    </div>
                </div>
                <div>
                    <img src={LostLogo} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
            </div>

            <div className="bg-white h-full p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Product sold</p>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold">{InformationWonLost && InformationWonLost.won_Leads_Count ? <CountUp start={0} end={InformationWonLost.won_Leads_Count} duration={2.75} /> : ''}</p>
                    </div>
                </div>
                <div>
                    <img src={ProductDashbord} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
            </div>

            <div className="bg-white h-full p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                    <p className="text-[14px] sm:text-[16px] text-[#7C838B]">Probability</p>
                    <div>
                        <p className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold"><CountUp start={0} end={Probablity} duration={2.75} />%</p>
                        <p className="flex pt-1 text-xs sm:text-sm">
                            <span className="text-[#04B306] flex items-center mr-1">
                                <img src={Up} alt="Up arrow" className="w-3 h-3 mr-1" /> 0.5%
                            </span>
                            from yesterday
                        </p>
                    </div>
                </div>
                <div>
                    <img src={ProbabltySvg} alt="Probability icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                </div>
            </div>

            <div className="bg-[#D1E4FF] h-full p-3 sm:p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                <p className='text-[26px]'>Conversion rate</p>
                <p className='text-[26px] text-[#1971F6] pt-[20px]'>{InformationWonLost && InformationWonLost.conversion_Rate ? <CountUp start={0} end={InformationWonLost.conversion_Rate} duration={2.75} /> : ''}%</p>
            </div>

        </div>

    )
}

export default Cards
