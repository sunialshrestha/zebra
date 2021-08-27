import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import Message from '../components/Message'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ''
  )
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ''
  )
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ''
  )
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ''
  )

  const [formState, setFormState] = useState({
    addressError: '',
    cityError: '',
    postalCodeError: '',
    countryError: '',
    addressValid: false,
    cityValid: false,
    postalCodeValid: false,
    countryValid: false,
    formValid: false,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    const newFormState = { ...formState }
    if (address === '') {
      newFormState.addressError = 'address is required'
      newFormState.addressValid = false
    }
    // accept a-z  A-Z  0-9  -  space  tab  enter  /
    // eslint-disable-next-line
    else if (address.match(/^([a-zA-Z0-9\-\s\/]{3,20})+$/) === null) {
      newFormState.addressValid = false
      newFormState.addressError = 'Enter address properly'
    } else {
      newFormState.addressError = ''
      newFormState.addressValid = true
    }

    if (city === '') {
      newFormState.cityValid = false
      newFormState.cityError = 'city is required'
    } else if (city.match(/^([a-zA-Z]{3,20})+$/) === null) {
      newFormState.cityValid = false
      newFormState.cityError = 'Enter city properly'
    } else {
      newFormState.cityValid = true
      newFormState.cityError = ''
    }

    if (postalCode === '') {
      newFormState.postalCodeValid = false
      newFormState.postalCodeError = 'postal code is required'
    } else if (postalCode.match(/^([0-9]{4})+$/) === null) {
      newFormState.postalCodeValid = false
      newFormState.postalCodeError = 'postal code should be 4 digits'
    } else {
      newFormState.postalCodeValid = true
      newFormState.postalCodeError = ''
    }

    if (country === '') {
      newFormState.countryValid = false
      newFormState.countryError = 'country is is required'
    } else if (country.match(/^([a-zA-Z]{3,20})+$/) === null) {
      newFormState.countryValid = false
      newFormState.countryError = 'Enter country properly'
    } else {
      newFormState.countryValid = true
      newFormState.countryError = ''
    }

    setFormState({
      addressError: newFormState.addressError,
      cityError: newFormState.cityError,
      postalCodeError: newFormState.postalCodeError,
      countryError: newFormState.countryError,
      addressValid: newFormState.addressValid,
      cityValid: newFormState.cityValid,
      postalCodeValid: newFormState.postalCodeValid,
      countryValid: newFormState.countryValid,
      formValid:
        newFormState.addressValid &&
        newFormState.cityValid &&
        newFormState.postalCodeValid &&
        newFormState.countryValid,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    address,
    city,
    postalCode,
    country,
    formState.addressValid,
    formState.cityValid,
    formState.countryValid,
    formState.postalCodeValid,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (formState.formValid) {
      dispatch(saveShippingAddress({ address, city, postalCode, country }))
      history.push('/payment')
    }
  }

  return (
    <FormContainer>
      <h1> Shipping </h1>
      <Form onSubmit={submitHandler}>
        {formState.addressError !== '' && (
          <Message variant='danger'>{formState.addressError}</Message>
        )}
        <Form.Group controlId='address'>
          <Form.Label> Address </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            autoFocus
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formState.cityError !== '' && (
          <Message variant='danger'>{formState.cityError}</Message>
        )}
        <Form.Group controlId='city'>
          <Form.Label> City </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formState.postalCodeError !== '' && (
          <Message variant='danger'>{formState.postalCodeError}</Message>
        )}
        <Form.Group controlId='postalCode'>
          <Form.Label> Postal Code </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formState.countryError !== '' && (
          <Message variant='danger'>{formState.countryError}</Message>
        )}
        <Form.Group controlId='country'>
          <Form.Label> Country </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' disabled={!formState.formValid} variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
export default ShippingScreen
