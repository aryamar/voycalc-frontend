import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import develop from '../Images/develop.png'
import pngegg from '../Images/pngegg.png'
import './Signup.css'
import api from '../api'

function Signup() {
    const [userdata, setUserdata] = useState([])
    const [inputget, setInputget] = useState({
        username: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    console.log(inputget)
    console.log(userdata)

    useEffect(() => {

        const gdata = async () => {
            const rtrvdata = await api.get('/signup')
            setUserdata(rtrvdata.data)
        }
        gdata()
    }, [])



    const btnsignup = (async (e) => {
        e.preventDefault()
        try {
            await api.post('/login', inputget)
            alert('Successfully Registered')
            navigate('/voyestimation')
        } catch (err) {
            console.log(err)
        }


    })
    return (
        <>
            <div className='divx'  >
                <form className='form' style={{ padding: '100px' }}>

                    <h1>Sign Up</h1>
                    <div className='divsignup'>
                        <img src={develop} alt='envelop' width='30px' height='30px' />
                        <input type='email' className='form-control' name='email' style={{ border: '0px', margin: "4px", width: '100%' }} onChange={(e) => setInputget({ ...inputget, email: e.target.value })} placeholder='E-Mail' />
                    </div>

                    <div className='divsignup'>
                        <img src={pngegg} alt='envelop' width='30px' height='30px' />
                        <input type='password' className='form-control' name='email' style={{ border: '0px', margin: "5px" }} onChange={(e) => setInputget({ ...inputget, password: e.target.value })} placeholder='Password' />
                    </div>

                    <input type='submit' onClick={btnsignup} />


                </form>
            </div>
        </>
    )
}


export default Signup