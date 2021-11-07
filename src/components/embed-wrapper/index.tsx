import React, { useEffect, useState } from 'react'
import EmbedContext from '../../utils/embed-context'
import loadjs from 'xp-loadjs'
import { ENV } from '../../config'
import { ICardErrors,Error } from '../../utils/types'

// import Loading from "../loader";

interface EmbeddingFieldsProps {
  onPaymentComplete: ( payment: any,error: Error) => void;
  onCanSubmitChange?: (value: boolean) => void;
  onSubmitStateChange?: (state: string) => void;
  onPaymentTabClose?: () => void,
  publicKey: string;
  onErrors?: (errors: ICardErrors) => void;

  [key: string]: any;
}

declare const Dibsy: any

function Index(props: EmbeddingFieldsProps) {
  const [dibsy, setDibsy] = useState(null)
  const [isCheckoutSubmitted, setIsCheckoutSubmitted] = useState(false)
  useEffect(() => {
    initDibsy().then()
  }, [])

  async function initDibsy() {
    if (dibsy) return
    try {
      await loadjs(ENV.DIBSY_SDK_URL)
      const _dibsy = await Dibsy(props?.publicKey, {
        options: {
          disableLoader: true
        },
        onFieldsError: (errors: ICardErrors) => {
          if(props?.onErrors){
            props?.onErrors(errors)
          }
        },
        canSubmit: ((canSub: boolean) => {
          props?.onCanSubmitChange(canSub)
        })
      })

      setDibsy(_dibsy)
    } catch (ex) {
      console.log('Error while loading Dibsy SDK library')
    }
  }

  const onSubmitStateChange = (state: string) => {
    if (props.onSubmitStateChange) {
      props.onSubmitStateChange(state)
    }
    if (state === 'complete') {
      setIsCheckoutSubmitted(false)
    }
  }
  const submitPayment = (paymentToken: string) => {
    if (!dibsy) return
    try {
      setIsCheckoutSubmitted(true)
      dibsy.submit({
        paymentToken,
        state: onSubmitStateChange,
        onClose: props.onPaymentTabClose,
        callback: props.onPaymentComplete
      })
    } catch (ex) {
      // console.log(ex);
    }
  }

  // if (!dibsy) return <Loading />;
  if (!props.children) return null
  return (
    <EmbedContext.Provider
      value={{ dibsy }}
    >
      {
        dibsy && props.children({ submitPayment, isCheckoutSubmitted })
      }
    </EmbedContext.Provider>
  )
}

export default Index
