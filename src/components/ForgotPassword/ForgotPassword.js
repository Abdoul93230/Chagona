import React from 'react'
import "./ForgotPassword.css"
import { ChevronRight,MessageSquare } from 'react-feather'

function ForgotPassword() {
  return (
    <div className='ForgotPassword'>
      <p>Enter the email address you used to create your account and we will email you a link to reset your password</p>
      <ul>
            <li>
                <div className='left'>
                    <MessageSquare/>
                </div>
                <div className='right'>
                    <label>Email</label>
                    <input type='email' placeholder='janedoe123@email.com' />
                </div>
            </li>

           

           
        </ul>

        <button>Send email <span><ChevronRight/></span></button>
    </div>
  )
}

export default ForgotPassword