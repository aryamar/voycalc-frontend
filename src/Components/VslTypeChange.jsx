import { useState, useEffect } from 'react'

export default function VslTypeChange({ keychange, onUpdate }) {

    const [vsltypevalue, setVslTypeValue] = useState({})

    const supra = keychange.Deadweight >= 50000 && keychange.Deadweight <= 60000
    const panamax = keychange.Deadweight >= 60001 && keychange.Deadweight <= 80000
    const handymax = keychange.Deadweight >= 35001 && keychange.Deadweight <= 49999
    const handysize = keychange.Deadweight >= 25001 && keychange.Deadweight <= 35000
    const generalpurpose = keychange.Deadweight >= 10000 && keychange.Deadweight <= 25000
    const capesize = keychange.Deadweight >= 80001 && keychange.Deadweight <= 120000
    const suezmax = keychange.Deadweight >= 120001 && keychange.Deadweight <= 200000

    useEffect(() => {

        switch (true) {
            case supra:
                setVslTypeValue('Supra')
                keychange.Vessel_Type = vsltypevalue
                break;

            case panamax:
                setVslTypeValue('Panamax')
                keychange.Vessel_Type = vsltypevalue
                break;

            case handymax:
                setVslTypeValue('Handymax')
                keychange.Vessel_Type = vsltypevalue
                break;

            case handysize:
                setVslTypeValue('Handysize')
                keychange.Vessel_Type = vsltypevalue
                break;

            case generalpurpose:
                setVslTypeValue('G.CGO')
                keychange.Vessel_Type = vsltypevalue
                break;

            case capesize:
                setVslTypeValue('Capesize')
                keychange.Vessel_Type = vsltypevalue
                break;

            case suezmax:
                setVslTypeValue('Suezmax')
                keychange.Vessel_Type = vsltypevalue
                break;
            default: keychange.Vessel_Type = "Unknown"
        }
        

       
            onUpdate(vsltypevalue)
        

    }, [capesize, generalpurpose, handymax, handysize, keychange, panamax, suezmax, supra, vsltypevalue, onUpdate])


}
