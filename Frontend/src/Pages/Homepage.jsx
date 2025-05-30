import React, { useEffect, useRef, useState } from 'react'
import './Homepage.css'
import LandingPage from '../Components/Home/LandingPage'
import Section2 from '../Components/Home/Section2'
import Section3 from '../Components/Home/Section3'
import Testimonials from '../Components/Home/Testimonials'
import BookTable from '../Components/Home/BookTable'
import Section4 from '../Components/Home/Section4'

const Homepage = () => {

  return (
    <>
      <LandingPage />
      <Section2 />
      <Section3 />
      <Section4 />
      <Testimonials />
      <BookTable />
    </>
  )
}

export default Homepage