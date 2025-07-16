import React from 'react'
import { Banner, Header, SpecialityMenu, TopDoctor } from './Index'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctor/>
      <Banner/>
    </div>
  )
}

export default Home