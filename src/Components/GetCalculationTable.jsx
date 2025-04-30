import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'
export default function GetCalculationTable() {

    const [updatecalcdata, setUpdateCalcData] = useState([])

    useEffect(() => {
        const getcalcdata = (async () => {
            await api.get('/calculation')
                .then(res => setUpdateCalcData(res.data))
                .catch(err => console.error('Fetching data face the problem', err))
        })
        getcalcdata()

    }, [])
    console.log(updatecalcdata)
    return (
        <>
            <div className='box'>
             
            </div>
        </>
    )
}
