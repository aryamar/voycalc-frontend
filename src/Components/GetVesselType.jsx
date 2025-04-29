import { useEffect, useState } from 'react'
import axios from 'axios'

export default function GetVesselType({ onUpdate }) {

    const [vsltype, setVslType] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {     

            const getVslType = (async () => {
                setLoading(true)
                try {                    
                    const gtType = await axios.get('http://localhost:5000/vsltype')
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
