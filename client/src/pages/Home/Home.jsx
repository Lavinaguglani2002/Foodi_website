import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonial from './Testimonial'
import OurService from './OurService'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Categories/>
        <SpecialDishes/>
        <Testimonial/>
        <OurService/>
    </div>
  )
}

export default Home