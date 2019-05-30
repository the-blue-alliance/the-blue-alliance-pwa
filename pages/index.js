import React from 'react'
import Link from 'next/link'

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link href='/events'><a>Events</a></Link>
  </div>
)

export default Home
