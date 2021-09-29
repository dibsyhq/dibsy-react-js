import React, { useContext } from 'react';
import EmbedContext from '../../utils/embed-context';
import styles from '../../styles/style.module.css';
import { CardElementProps } from '../../utils/types'

function CardNumber(props: CardElementProps) {
  const { dibsy } = useContext(EmbedContext);
  React.useEffect(() => {
    if (!dibsy)
      throw new Error(`This component should be wrapped inside EmbedFields.`);
    const cardNumber = dibsy.createComponent('cardNumber');
    cardNumber.mount('#card-number', props.customStyles || {});
    cardNumber.errorMessage('#card-number-error');
  }, []);
  return (
    <div className={styles.w100}>
      <div id="card-number" />
      <div id="card-number-error" className={styles.errorMessage} />
    </div>
  );
}

export default CardNumber;
