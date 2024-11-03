import React from 'react'
import Left from '../Components/Welcome/Left'
import Right from '../Components/Welcome/Right'

const Welcome = () => {
    return (
        <div className='mx-auto container h-screen '>
            <div className='flex h-full items-center '>
                <Left />
                <Right />
            </div>
        </div>
    )
}

export default Welcome
