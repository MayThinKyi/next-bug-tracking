import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata() {
  return {
    title: 'Dashboard',
    description: 'This is the Dashboard Page of Next14 Issue Tracker App'
  }
}
const HomePage = () => {

  return (
    <div>
      HomePage
    </div>
  )
}

export default HomePage
