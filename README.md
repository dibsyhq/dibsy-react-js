# @dibsy/react-js

> React component for Dibsy.js

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


## Simple Example

1. Create a .env file with your Dibsy public API key and your backend API endppoint.

```tsx
  REACT_APP_DIBSY_PUBLIC_KEY="your_public_Dibsy_API_key"
  REACT_APP_YOUR_BACKEND_API="your_backend_API_endpoint"
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

    // Initialize the payment and submit the payment token.
    axios.post(`${process.env.REACT_APP_YOUR_BACKEND_API}/init-payment`).then(res => {
      if (res?.data?.paymentToken) {
        // Submit the Payment
        submitPayment(res.data.paymentToken)
      } else {
        console.log('Error while initiating payment')      }
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



- [Dibsy React Component Reference](https://docs.dibsy.one/dibsy-components/react)


### `EmbedWrapper` Component props
The `EmbedWrapper` is a parent component that allows you to embed the checkout fields and the submit button inside them. You must also use EmbedWrapper to pass your Dibsy public key and recieve props related to the payment process.
```
  onPaymentComplete: (success: boolean, payment: any) => void;
  onCanSubmitChange?: (value: boolean) => void;
  onSubmitStateChange?: (state: string) => void;
  onPaymentTabClose?: () => void,
  publicKey: string;
  onErrors?: (errors: ICardErrors) => void;
```

#### onPaymentComplete

Type: `(success: boolean, payment: any) => void`

Default: `undefined`

The function is triggered when the payment is completed.


#### onCanSubmitChange

Type: `(value: boolean) => void`

Default: `undefined`

The function tracks if the the button can be submitted or no.

#### onSubmitStateChange

Type: `(state: string) => void`

Default: `undefined`

The function tracks different state of the payment completed,failed,success,3ds



#### onPaymentTabClose

Type: `() => void`

Default: `undefined`

The function is triggered when the window closed or 3ds authentitication form is closed.


####   onErrors?: (errors: ICardErrors) => void;


Type: `(errors:Object) => void`

Default: `undefined`

The function tracks the checkout errors for each field, the parameter errors is an object with name of each field and the error.
```
  errors : {
      cardNumber:"error message or null"
      cardCode:"error message or null"
      expiryDate:"error message or null"
  }
```


#### publicKey

Type: `string`

Default: `undefined`
	The public key API from [Dibsy Dashboard](https://dashboard.dibsy.one).



### `CardNumber`, `CardCvc`, `ExpiryDate` Components props
Checkout fields components provide a flexible way to securely collect payment information in your React app. They must be passed as children of the `EmbedWrapper` inside a function which taken two parameters, `submitPayment` and `isCheckoutSubmitted`.


```
  customStyles: object;
```

#### customStyles

Type: `object`

Default: `undefined`

Custom style for the card inputs.


## License

MIT © [dibsyhq](https://github.com/dibsyhq), [Oussidi Mohamed](https://github.com/Oussidi1998)
 