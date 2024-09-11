import React from 'react'
import { NavBar } from './NavBar'
import { Link } from 'react-router-dom'

const UserDashboard = () => {
  return (
    <div className="container">
    <NavBar/>
    <br /><br />
    <div className="row">
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <div class="d-grid gap-2 col-6 mx-auto">
    <Link class="btn btn-secondary" type="button" to={'/request'}>REQUEST</Link>

</div>
        </div>
    </div>
</div>
  )
}

export default UserDashboard