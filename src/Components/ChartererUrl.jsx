import  { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api'


export default function Charterer() {

    const [getCharterer, setGetCharterer] = useState([])

 

    useEffect(() => {
        const getchdata = async () => {
            try {
                await api.get("/charterer")
                    .then(res => setGetCharterer(res.data))
                    
            } catch {
                console.error({ error: 'There is something wrong with fetching data.' })

            }
        }
        getchdata()
    },[])

   

    return getCharterer
}