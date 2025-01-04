import axios from 'axios'
import React, { useState } from 'react'

const SearchVolunteer = () => {
  const [data,setData]=useState({
    "name":""
  })

  // DELETE EVENT

  const [result,resultData]=useState([])
  const deletevolunteer=(id)=>{
    let input= {"_id": id }
    axios.post("http://localhost:8080/vdelete",input).then(
      (response)=>{
        console.log(response.data)
        if (response.data.status==="success") {
          alert("SUCCESSFULLY DELETED")
        } else {
          alert("FAILED TO DELETE")
        }
      }
    ).catch().finally()
  }

  const inputHandler=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }
  const readValue=()=>{
    console.log(data)
    axios.post("http://localhost:8080/vsearch",data).then(
      (response)=>{
        resultData(response.data)
      }
    ).catch(
      (error)=>{
        console.log(error)
      }
    )
  }
  return (
    <div className="container">
      <center><b><h2>SEARCH VOLUNTEER</h2></b></center><br />
      <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-lg-12 col-xl-12 col-xxl-12">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col col-xl-12 col-xxl-12">
            <form action="" className="label-form">Name</form>
            <input type="text" className="form-control" name='name' value={data.name} onChange={inputHandler}/><br />
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col col-xl-12 col-xxl-12">
           <center> <button className="btn btn-success" onClick={readValue}>Search</button></center>
            </div>
          </div>
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Certificate</th>
                  <th>Skill</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Delete</th> {/* Add Action column for selection */}
                </tr>
              </thead>
              <tbody>
                  {result.map(
                    (value,index)=>{
                      return <tr>
                        <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.address}</td>
                    <td>{value.certificate}</td>
                    <td>{value.skill}</td>
                    <td>{value.age}</td>
                    <td>{value.gender}</td>
                    <td>{value.phone}</td>
                    <td><button className="btn btn-danger" onClick={()=>{deletevolunteer(value._id)}}>Delete</button></td>
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
    </div>
  )
}

export default SearchVolunteer