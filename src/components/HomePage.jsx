import React from 'react'
import { NavBar } from './NavBar'

const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
          <NavBar/>
        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"><br />
        <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="canva.png" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="canva.png" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="canva.png" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        </div>
      </div>
    </div>
    
  )
}

export default HomePage