import React from 'react'
import BottomMenuMob from '../components/BottomMenuMob'
import Header from '../components/Header'
import PaymentForm from '../components/PaymentForm'

const Payment = () => {
  return (
    <div>
      <Header/>
      <PaymentForm/>
      <BottomMenuMob/>
    </div>
  )
}

export default Payment