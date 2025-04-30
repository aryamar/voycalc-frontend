import { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'

export default function CalculationUrl() {
    const [getCalc, setGetCalc] = useState([])
  

    useEffect(() => {

        const fetchingData = async () => {
            try {
                await api.get('/calculation')
                    .then(res => setGetCalc(res.data))
            } catch (err) {
                console.error({ error: 'There is something wrong with fetvhing data' })
            }
           
        }
        fetchingData()
    }, [])
    return getCalc
};
