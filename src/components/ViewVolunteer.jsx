import React from 'react'
import { NavBar } from './NavBar'
import { useState } from 'react'

const ViewVolunteer = () => {
    const [data, setData] = useState(
        [
            {"name": "sree", "email": "sree@123", "address": "viyyath house", "skill": "swimming", "age": "22", "gender": "female", "phone": "126474884"}
        ]
    );
    
  return (
    <div>
        <br /><center><h2><b>VOLUNTEERS</b></h2></center>
    <div className="container">
        <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Address</th>
      <th>Skill</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Phone</th>
      
    </tr>
  </thead>
  <tbody>
   {data.map(
    (value,index)=>{
        return  <tr>
        <td>{value.name}</td>
        <td>{value.email}</td>
        <td>{value.address}</td>
        <td>{value.skill}</td>
        <td>{value.age}</td>
        <td>{value.gender}</td>
        <td>{value.phone}</td>
      </tr>
    }
   )

   }
  </tbody>
</table>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ViewVolunteer