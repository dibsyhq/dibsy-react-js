import React, { useContext } from 'react'
import styles from '../../styles/style.module.css'
import EmbedContext from './../../utils/embed-context'
import { CardElementProps } from '../../utils/types'

function CardCvc(props: CardElementProps) {
  const { dibsy } = useContext(EmbedContext)

  React.useEffect(() => {
    if (!dibsy)
      throw new Error(`This component should be wrapped inside EmbedWrapper.`)
    const cardNumber = dibsy.createComponent('cardCode')
    cardNumber.mount('#card-code', props.customStyles || {})
    cardNumber.errorMessage('#card-code-error')
  }, [])
  return (
    <div className={styles.w100}>
      <div id='card-code' />
      <div id='card-code-error' className={styles.errorMessage} />
    </div>
  )
}

export default CardCvc
