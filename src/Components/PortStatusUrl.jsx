import  { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../api'

export default function PortStatus() {

    const [PortState, setPortStatus] = useState([])

    useEffect(() => {

        const getState = async () => {
            try {
                await api.get('/portstatus').then(
                    res => setPortStatus(res.data))
                   

            }
            catch (err) {

                console.error("There is something wrong with fetching data.")
            }
        }
        getState()
    }, [])

    return PortState
       
}
