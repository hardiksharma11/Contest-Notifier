import React from 'react'
import { useState } from 'react'


const Email = (props) => {
    
    const [email , setEmail] = useState('') ; 
    const detail = props.body ; 

    // console.log(props.body) 

    const handleChange = (event) => {
        setEmail(event.target.value) ; 
    }

  return (
    <div>
      
      {/* <label htmlFor="email">Enter your Email : </label> */}
      <input value={email} placeholder = "Enter your email Here" onChange={handleChange} name="email" id="email" />
      {/* <input type="submit" value="Get Notified!" onClick={(e)=>{e.preventDefault(); console.log(email) }}  /> */}
      <a href="mailto:`{email}`?subject='Contest Schedules'&body={detail}">Mail Me The Details ! </a>
    </div>
  )
}

export default Email
