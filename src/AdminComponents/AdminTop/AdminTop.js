import React from 'react'
import "./AdminTop.css"
function AdminTop(props) {
  return (
    <div className='AdminTop'>
        <h2>{props.titel}</h2>
        <div className='right'>
            <div className='un'>
                <span>Days</span>
                <span>Weeks</span>
                <span>Months</span>
            </div>
            <div className='deux'>
            <input type="date" name="date" id="date"/>
            </div>
        </div>
    </div>
  )
}

export default AdminTop

