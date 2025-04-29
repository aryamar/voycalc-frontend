import { useState, useEffect } from 'react'
import axios from 'axios'



export default function DistanceUrl({ lpname, dpname, onDistanceUpdate }) {
    const [Distance, setDistance] = useState(null)



    useEffect(() => {
        const getDistanceData = async () => {
            if (!lpname || !dpname) {
               

            } else {
                await axios.get(`http://localhost:5000/distance`, { params: { lpname, dpname } })
                    .then(res => { setDistance(res.data.Distance) })


                    .catch(err => {
                        console.error('Fetching Data ERROR', err)
                        setDistance(0)
                    })
            }
        }
        getDistanceData()
    }, [lpname, dpname])

    useEffect(() => {
        if (Distance) {
          onDistanceUpdate(Distance);
        }
      }, [Distance, onDistanceUpdate]);
    
     // return <div>Distance: {Distance ?? "Loading..."}</div>;
}