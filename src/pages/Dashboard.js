import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function Dashboard() {
    const navigate = useNavigate(); //nav to page
    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem('token') === "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            getUser();
        }
    }, []) //exc only at start

    const getUser = () => {
        axios.get('/api/user', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }) //local api
            .then((snag) => {
                setUser(snag.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const logout = () => {
        axios.post('/api/logout', {}, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then((p) => {
                localStorage.setItem('token', "")
                navigate("/");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <Layout>
            <div className="dashboard">
                <div className="col-12">
                    <nav className="navbar">
                        <div className="container-fluid containTop">
                            <p className="navbar-brand">Soccer Tracker</p>
                            <a className='startDC nav-link' href='#'>Play</a>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a onClick={() => logout()} className="nav-link " aria-current="page" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <h2 className="text-center mt-5">Welcome, {user.name}!</h2  >
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;