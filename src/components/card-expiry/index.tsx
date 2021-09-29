import React, { useContext } from 'react';
import styles from '../../styles/style.module.css';
import EmbedContext from '../../utils/embed-context';
import { CardElementProps } from '../../utils/types'

function ExpiryDate(props: CardElementProps) {
  const { dibsy } = useContext(EmbedContext);

  React.useEffect(() => {
    if (!dibsy)
      throw new Error(`This component should be wrapped inside EmbedFields.`);
    const cardNumber = dibsy.createComponent('expiryDate');
    cardNumber.mount('#expiry-date', props.customStyles || {});
    cardNumber.errorMessage('#expiry-date-error');
  }, []);
  return (
    <div className={styles.w100}>
      <div id="expiry-date" />
      <div id="expiry-date-error" className={styles.errorMessage} />
    </div>
  );
}

export default ExpiryDate;
