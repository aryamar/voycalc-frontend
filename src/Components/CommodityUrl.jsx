import { useState,useEffect } from "react"
import axios from 'axios'
import api from "../api"
export default function CommodityUrl() {

    const[getCommodity,setGetCommodity]=useState([])

     useEffect(() => {
            const getCargo = async () => {
    
                await api.get('/commodity')
                .then(res=>setGetCommodity(res.data))                
            }
            getCargo()
        }, [])
    

  return getCommodity
}
