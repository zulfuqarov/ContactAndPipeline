import React, { useEffect, useState } from 'react'
import Topproducts from '../Components/Dashboard/Topproducts'
import axios from 'axios';
import Statuscount from '../Components/Dashboard/Statuscount';
import ProbabltySvg from '../Assets/Img/PropobaltySvg.svg'
import Cards from '../Components/Dashboard/Cards';
import DashBoardNav from '../Components/Dashboard/DashBoardNav';
import TopDearles from '../Components/Dashboard/TopDearles';

const apiUrl = import.meta.env.VITE_API_URL;


const DashBoard = () => {

    // getTopProduct
    const [topProduct, settopProduct] = useState([])
    const getTopProduct = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/Dashboard/WonStageProduct`)
            settopProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // getStatus
    const [dataset, setdataset] = useState([])
    const getStatus = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/Dashboard/StatusCount`);
            console.log()
            setdataset(response.data)
        } catch (error) {
            console.log()
        }
    }

    // getProbablty
    const [Probablity, setProbablity] = useState('')
    const getProbablity = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/Dashboard/AverageProbability`)
            setProbablity(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // getGetInformationWonLost
    const [InformationWonLost, setInformationWonLost] = useState()
    const getInformationWonLost = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/Dashboard/GetInformationWonLost`)
            setInformationWonLost(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    //WonStageDealers
    const [WonStageDealers, setWonStageDealers] = useState([])
    const getWonStageDealers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/Dashboard/WonStageDealers`)
            setWonStageDealers(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getTopProduct()
        getStatus()
        getProbablity()
        getInformationWonLost()
        getWonStageDealers()
        return () => {
            settopProduct()
            setdataset()
            setProbablity()
            setInformationWonLost()
            setWonStageDealers()
        };

    }, [])
    return (
        <div className='pb-[0px] fonstDashBoard'>

            <DashBoardNav />

            <Cards Probablity={Probablity} InformationWonLost={InformationWonLost} />


            <div className='flex justify-evenly items-start px-[23px] pt-[30px]'>
                <Topproducts topProduct={topProduct} />
                <Statuscount dataset={dataset} />
                <TopDearles WonStageDealers={WonStageDealers} />
            </div>
        </div>
    )
}

export default DashBoard
