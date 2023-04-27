import React from 'react'
import {Elements} from "@stripe/react-stripe-js"
import {loadstripe} from "@stripe-js"

const PUBLIC_KEY " quin's public key here"

const stripeTestPromise = loadStripe (PUBLIC_KEY)

export default function StripeContainer(){
    return (
    <Elements stripe={stripeTestPromise}>
        < PaymentForm />
    </Elements>
        )
}