import React, { useState } from 'react'
import { EmbedWrapper, CardNumber, ExpiryDate, CardCvc } from '@dibsy/react-js'
import axios from 'axios'
import '@dibsy/react-js/dist/index.css'
import './app.css'

type submitPaymentFunctionType = (paymentToken: string) => void

const App = () => {
  const [canSubmit, setCanSubmit] = useState(false)

  function onSubmit(e: any, submitPayment: submitPaymentFunctionType) {
    e.preventDefault()

    // init the payment and submit the payment token
    // in data you can send productId in order to get amount,.. from you backend
    axios.post(`${process.env.REACT_APP_YOUR_BACKEND_API}/init-payment`).then(res => {
      if (res?.data?.paymentToken) {
        // submit the payment to dibsy server
        submitPayment(res.data.paymentToken)
      } else {
        console.log('error while initiating the payment')
      }
    }).catch(error => console.log(error))
  }


  function onPaymentComplete(success: boolean, transaction: any) {
    console.log(success, transaction)
  }

  function onErrors(errors: any) {
    // errors is an object contain errors message of each field
    /*
        errors : {
          cardNumber:"error message",
          cardCode:"error message",
          expiryDate:"error message"
        }
     */
    console.log('errors ', errors)
  }

  return <EmbedWrapper
    publicKey={String(process.env.REACT_APP_DIBSY_PUBLIC_KEY)}
    onCanSubmitChange={(value) => {
      setCanSubmit(value)
    }}
    onPaymentComplete={onPaymentComplete}
    onErrors={onErrors}
  >
    {
      ({
         submitPayment,
         isCheckoutSubmitted
       }: {
        submitPayment: submitPaymentFunctionType,
        isCheckoutSubmitted: boolean
      }) => <div className={'card-container'}>
        <CardNumber  />
        <div className='row'>
          <div className='col'>
            <ExpiryDate />
          </div>
          <div className='col'>
            <CardCvc />
          </div>
        </div>
        <button className={'submit-button'} onClick={(e) => onSubmit(e, submitPayment)}
                disabled={!canSubmit || isCheckoutSubmitted} type='submit'>
          {
            !isCheckoutSubmitted ? 'Submit checkout' : 'Submitting ...'
          }
        </button>
      </div>
    }
  </EmbedWrapper>
}

export default App
