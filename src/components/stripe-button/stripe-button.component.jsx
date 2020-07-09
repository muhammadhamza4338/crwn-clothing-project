import React from 'react' ;
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton=({price}) => {
    const priceForStripe=price * 100;          /* we convert it into cents by multiplying with hundred bcz stripe deal in cents*/
    const publishableKey='pk_test_51H0vIBALNI7mlV0dCkG7PFqnLPrN4LSTJsOZUzUg195Jrr5osM8i2guHnJQCMcVNEs7guR4AHBBiqnXQwOExptBq00mwp8JGPQ';


    //token is actually to perform backend payment process but we are not doing that is why we just print alert with token
  const  onToken=token => {
        console.log(token);
        alert('Payment Successful' );
    };

    return(
        <StripeCheckout
        label='Pay Now'
        name ='CRWN CLOTHING Ltd.'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );

};
export default StripeCheckoutButton;