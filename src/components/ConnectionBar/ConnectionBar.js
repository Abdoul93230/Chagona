import React from 'react'
import "./ConnectionBar.css"

function ConnectionBar({chg}) {
  return (
    <div className='ConnectionBar'>
        <ul>
            <li onClick={()=>chg("SingnUp")} className="li">Singn Up</li>
            <li onClick={()=>chg("LogIn")} className="li">Log In</li>
            <li onClick={()=>chg("forgotP")} className="li">Forgot Password</li>
        </ul>
    </div>
  )
}

export default ConnectionBar