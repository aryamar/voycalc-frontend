import  { useState, useEffect } from 'react'
import axios from 'axios'


export default function PortStatus() {

    const [PortState, setPortStatus] = useState([])

    useEffect(() => {

        const getState = async () => {
            try {
                await axios.get('http://localhost:5000/portstatus').then(
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
