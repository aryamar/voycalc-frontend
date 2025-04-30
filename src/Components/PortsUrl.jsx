import  { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api'
export default function PortsUrl() {

    const [getPort, setGetPort] = useState([])

    useEffect(() => {
        const getPort = async () => {

            try {
                await api.get('/ports')
                    .then(res => setGetPort(res.data))
            } catch (err) {
                console.error({ err: 'There is something wrong with fetching data.' })
            }
        }
        getPort()
    },[])

    return getPort
}
