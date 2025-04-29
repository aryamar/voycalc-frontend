import  { useEffect, useState } from 'react'
import axios from 'axios'
export default function PortsUrl() {

    const [getPort, setGetPort] = useState([])

    useEffect(() => {
        const getPort = async () => {

            try {
                await axios.get('http://localhost:5000/ports')
                    .then(res => setGetPort(res.data))
            } catch (err) {
                console.error({ err: 'There is something wrong with fetching data.' })
            }
        }
        getPort()
    },[])

    return getPort
}
