import { useState, useEffect } from 'react'



export default function Formula({ keychange, onUpdate,faseleh }) {

    const [lpdays, setLpDays] = useState(0)
    const [dpdays, setDpDays] = useState(0)
    const [ladendays, setLadenDays] = useState(0)
    const [ballastdays, setBallastDays] = useState(0)
    const [values, setValues] = useState(0)
    const [ttlsteamdays, setTotalSteamDays] = useState(0)
    const [updatesteamdays, setUpdateSteamdays] = useState(0)
    const [ttlportdays, setTtlPortDays] = useState(0)
    

    console.log('keychange', keychange)

    useEffect(() => {
        setValues(lpdays + dpdays)
        setTtlPortDays(values + parseFloat(keychange.AddPortDays))
        setLpDays(parseFloat(keychange.Cargo_quantity) / parseFloat(keychange.LoadRate))
        setDpDays(parseFloat(keychange.Cargo_quantity) / parseFloat(keychange.DischargeRate))
        setLadenDays(parseFloat(keychange.Distance) / parseFloat(keychange.Speed_Laden * 24))
        setBallastDays(keychange.Distance / (keychange.Speed_Ballast * 24))
        setTotalSteamDays(parseFloat(updatesteamdays) + parseFloat(keychange.AddSteamDays))
        setUpdateSteamdays(parseFloat(ballastdays) + parseFloat(ladendays))

        // what to get relevant data from input fields in voyestimation component then roll back to the created function as updateFormol
        onUpdate({
            lpdays: lpdays,
            dpdays: dpdays,
            ladendays: ladendays,
            ballastdays: ballastdays,
            ttlsteamdays: ttlsteamdays,
            ttlportdays: ttlportdays,
            addportdays: keychange.AddPortDays,
            addsteamdays: keychange.AddSteamDays,
            updatesteamdays: updatesteamdays,
            values: values,
        })

        //they have been created to change online field`s value in voyestimation component 
        keychange.LportDays = lpdays
        keychange.DportDays = dpdays
        keychange.Ballast_Days = ballastdays
        keychange.Laden_Days = ladendays
        keychange.PortDays = ttlportdays
        keychange.Steam_Days = ttlsteamdays
        keychange.Distance = faseleh

        // incase no value in additional portdays the value set as lpdays+ dpdays

        if (!keychange.AddPortDays) {
            setTtlPortDays(values)
        }

        // incase no value in additional steamdays the value set as ballastdays+ladendays
        if (!keychange.AddSteamDays) {
            setTotalSteamDays(ballastdays + ladendays)
        }
      

    }, [keychange, lpdays, dpdays, values, ladendays, ballastdays, ttlsteamdays, keychange.Distance, updatesteamdays, keychange.AddSteamDays, keychange.AddPortDays, ttlportdays, faseleh])

   


}
