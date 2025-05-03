import React, { useState, useEffect } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import user from '../Images/user.png'
import develop from '../Images/develop.png'
import pngegg from '../Images/pngegg.png'
import { useAuth } from './Context'
import api from '../api'



function Login() {
    const [userdata, setUserdata] = useState([])

    const navigate = useNavigate()
    const { login } = useAuth()
    const { logout } = useAuth()

    


    const [userd, setUsername] = useState({
        username: '',
        email: '',
        password: ''
    })


    useEffect(() => {

        const gdata = async () => {
            const rtrvdata = await api.get('/login',{
                username:userd.username,
                email:userd.email,
                password:userd.password
            })
            setUserdata(rtrvdata.data)
        }
        gdata()
    }, [])

  

    const cmpremail = userdata.find(usrdta => usrdta.email === userd.email)
    const navigat = useNavigate()

    const UName = ((e) => {
        e.preventDefault()

        if (cmpremail && cmpremail.password === userd.password) {
            alert('Already registered')
            login()
            navigate('/voyestimation')

        } else {
            alert('you are not registered')
            logout()
            navigat('/signup')

        }

    })

    return (
        <>
       
            <div className='gradient'>
                <div id='mymoves' className='loginsegment' >
                    <form  >
                        <h1 style={{ textAlign: 'center' }}>Log In</h1>
                        <div className='divimg'>
                            <img src={user} alt='username' />
                            <input type="text" className="form-control" autoComplete='off' name="Name" id="Name" onChange={(e) => setUsername({ ...userd, username: e.target.value })} placeholder='User Name' />
                        </div>

                        <div className='divimg'>
                            <img src={develop} alt='username' />
                            <input type="email" className="form-control" style={{}} autoComplete='off' name="email" id="email" onChange={(e) => setUsername({ ...userd, email: e.target.value })} placeholder='E-mail' />
                        </div>

                        <div className='divimg'>
                            <img src={pngegg} alt='username' />
                            <input type="password" className="form-control" name="password" id="password" onChange={(e) => setUsername({ ...userd, password: e.target.value })} placeholder='Password' />
                        </div>
                    </form>

                    <small style={{ color: 'white', cursor: 'pointer', marginLeft: '15px' }}>forgot your <i> password? </i> </small>

                    <div className='btnlog'>
                        {/* <input type='submit' onClick={btnsignup} style={{ marginTop: '10px', marginRight: '35px' }} value='Sign Up' /> */}
                        <input type='submit' onClick={UName} style={{ marginTop: '10px' }} value='Log In' />
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login