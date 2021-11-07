
export interface ICardErrors {
  cardNumber: string;
  cardCode:string;
  expiryDate:string;
}

export interface CardSharedProps {
  customStyles?: object
}

export interface Error {
  message?: string
}


export interface CardElementProps extends CardSharedProps {
  [key: string]: any;
}
