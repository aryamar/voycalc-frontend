import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CalculationUrl() {
    const [getCalc, setGetCalc] = useState([])
  

    useEffect(() => {

        const fetchingData = async () => {
            try {
                await axios.get('http://localhost:5000/calculation')
                    .then(res => setGetCalc(res.data))
            } catch (err) {
                console.error({ error: 'There is something wrong with fetvhing data' })
            }
           
        }
        fetchingData()
    }, [])
    return getCalc
};
