import React from 'react'
import "./AllMessages.css"
import { Search, X } from 'react-feather'
import Navbar from '../NaveBar/Navbar'

function AllMessages({chg}) {
  return (
    <div className='AllMessages'>
        <div className='top'>
            <X className='x'/>
        </div>
        <h2>Messages</h2>
        <div className='search'>
            <input type='search' placeholder='search Conversations'/>
            <span><Search/></span>
        </div>
        


        <div style={{width:"100%",height:"auto",marginBottom:"70px"}}>
            {
                ["ss","Dj","Ab","sa"].map((param,index)=>{
                    return  <div onClick={()=>chg("det")} key={index} className='carde'>
                                <h3>{param}</h3>
                                <div className='main'>
                                    <h4>Smiley's Store</h4>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco… </p>
                                </div>
                                <div className='right'>
                                    <h4>9:20 AM</h4>
                                    <span>5</span>
                                </div>
                            </div>
                })
            }
        </div>



        <Navbar/>
    </div>
  )
}

export default AllMessages