import  { useEffect, useState } from 'react'
import axios from 'axios'



export default function Charterer() {

    const [getCharterer, setGetCharterer] = useState([])

 

    useEffect(() => {
        const getchdata = async () => {
            try {
                await axios.get("http://localhost:5000/charterer")
                    .then(res => setGetCharterer(res.data))
                    
            } catch {
                console.error({ error: 'There is something wrong with fetching data.' })

            }
        }
        getchdata()
    },[])

   

    return getCharterer
}