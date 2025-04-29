import { useState,useEffect } from "react"
import axios from 'axios'

export default function CommodityUrl() {

    const[getCommodity,setGetCommodity]=useState([])

     useEffect(() => {
            const getCargo = async () => {
    
                await axios.get('http://localhost:5000/commodity')
                .then(res=>setGetCommodity(res.data))                
            }
            getCargo()
        }, [])
    

  return getCommodity
}
