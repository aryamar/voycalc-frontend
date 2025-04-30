import { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api'

export default function GetVesselType({ onUpdate }) {

    const [vsltype, setVslType] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {     

            const getVslType = (async () => {
                setLoading(true)
                try {                    
                    const gtType = await api.get('/vsltype')
                    setVslType(gtType.data);                    
                    
                } catch (err) {
                    console.log(err);
                }finally{
                    setLoading(false)                   
                }
            })
           getVslType()          
       

        onUpdate(vsltype)

    }, [onUpdate]);



}
