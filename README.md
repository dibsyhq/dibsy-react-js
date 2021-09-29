# @dibsy/react-js

> React component for Dibsy

[![NPM](https://img.shields.io/npm/v/@dibsy/react-js.svg)](https://www.npmjs.com/package/@dibsy/react-js) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

@dibsy/react-js is available as an npm package.

```bash
npm install --save @dibsy/react-js
```

or if you prefer Yarn

```bash
yarn add @dibsy/react-js
```

## Documentation

## Usage Example

1. Create a .env file with your Dibsy public API key & your backend api endppoint.

```tsx
  REACT_APP_DIBSY_PUBLIC_KEY="your_public_Dibsy_API_key_here"
  REACT_APP_YOUR_BACKEND_API="your_backend_API_endpoint_here"
```

2. You can start with the basic example below.

```tsx
import React, { Component } from 'react'
import { EmbedWrapper, CardNumber, ExpiryDate, CardCvc } from '@dibsy/react-js'
import '@dibsy/react-js/dist/index.css'

type submitPaymentFunctionType = (paymentToken: string) => void

const Checkout = () => {

  const [canSubmit, setCanSubmit] = useState(false)

  function onSubmit(e: any, submitPayment: submitPaymentFunctionType) {
    e.preventDefault()

    // init the payment and submit the payment token
    // in data you can send productId in order to get amount,.. from your backend
    axios.post(`${process.env.REACT_APP_YOUR_BACKEND_API}/init-payment`).then(res => {
      if (res?.data?.paymentToken) {
        // submit the payment to dibsy server
        submitPayment(res.data.paymentToken)
      } else {
        console.log('error while initiating the payment')
      }
    }).catch(error => console.log(error))
  }


  function onPaymentComplete(success: boolean, payment: any) {
    console.log(success, payment)
  }

    return 
        <EmbedWrapper
            publicKey={process.env.REACT_APP_DIBSY_PUBLIC_KEY}
            onCanSubmitChange={(value) => {
              setCanSubmit(value)
            }}
            onPaymentComplete={onPaymentComplete}
          >
            {
              ({
                submitPayment,
                isCheckoutSubmitted
              } : {
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
                      <button 
                        className={'submit-button'} 
                        onClick={(e) => onSubmit(e, submitPayment)}
                        disabled={!canSubmit || isCheckoutSubmitted} type='submit' 
                        >
                        {
                          !isCheckoutSubmitted ? 'Submit checkout' : 'Submitting ...'
                        }
                      </button>
              </div>
            }
      </EmbedWrapper>
}
```

## Documentation

### `EmbedWrapper` Component props
```
  onPaymentComplete: (success: boolean, payment: any) => void;
  onCanSubmitChange?: (value: boolean) => void;
  onSubmitStateChange?: (state: string) => void;
  onPaymentTabClose?: () => void,
  publicKey: string;
  onErrors?: (errors: ICardErrors) => void;
```

- [Dibsy React component reference](https://docs.dibsy.one/dibsy-components/react)
- [Example Sandbox](linktosandbox)

## License

MIT © [dibsyhq](https://github.com/dibsyhq)
