import React, { useState, useContext } from 'react';
import { getIn, useFormik, FormikProvider, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import '../../scss/checkout.scss';
import { validationSchema } from '../../helpers/checkoutValidationSchema';
import CheckoutSummary from './CheckoutSummary';
import { CartContext } from '../../ context/cartContext';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { showConfirmation, removeAllProducts } = useContext(CartContext);

  const formik = useFormik({
    // I can use the initial value beow to prefill the form if i am editing it.
    initialValues: {
      billingDetails: {
        name: '',
        email: '',
        phoneNumber: '',
      },
      shippingInfo: {
        address: '',
        postCode: '',
        city: '',
        country: '',
      },
      paymentDetails: {
        number: '',
        pin: '',
      },
    },
    enableReinitialize: true,
    validationSchema: validationSchema(paymentMethod),

    onSubmit: (values) => {
      showConfirmation(true);
      removeAllProducts();
    },
  });

  return (
    <div className="checkout">
      <FormikProvider value={formik}>
        <Form
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
          onSubmit={formik.handleSubmit}
        >
          <div className="checkout__form-container  checkout__form-container--two-third-width">
            <h3 className="checkout__heading">CHECKOUT</h3>
            {/* The formikProvider component takes in my react useFormik hook and gives all the values and methods to the components  */}

            <Grid container spacing={3}>
              <h6 className="checkout__subheading">BILLING DETAILS</h6>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname">Name</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="billingDetails.name"
                  name="billingDetails.name"
                  value={formik.values.billingDetails.name}
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'billingDetails.name') &&
                    Boolean(getIn(formik.errors, 'billingDetails.name'))
                  }
                  helperText={
                    getIn(formik.touched, 'billingDetails.name') &&
                    getIn(formik.errors, 'billingDetails.name')
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname">Email Address</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="billingDetails.email"
                  name="billingDetails.email"
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'billingDetails.email') &&
                    Boolean(getIn(formik.errors, 'billingDetails.email'))
                  }
                  helperText={
                    getIn(formik.touched, 'billingDetails.email') &&
                    getIn(formik.errors, 'billingDetails.email')
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname">Phone number</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="billingDetails.phoneNumber"
                  name="billingDetails.phoneNumber"
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'billingDetails.phoneNumber') &&
                    Boolean(getIn(formik.errors, 'billingDetails.phoneNumber'))
                  }
                  helperText={
                    getIn(formik.touched, 'billingDetails.phoneNumber') &&
                    getIn(formik.errors, 'billingDetails.phoneNumber')
                  }
                />
              </Grid>
              <h6 className="checkout__subheading checkout__subheading--margin-top">
                SHIPPING INFO
              </h6>
              <Grid item xs={12}>
                <p className="checkout__fieldname">Your Address</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="shippingInfo.address"
                  name="shippingInfo.address"
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'shippingInfo.address') &&
                    Boolean(getIn(formik.errors, 'shippingInfo.address'))
                  }
                  helperText={
                    getIn(formik.touched, 'shippingInfo.address') &&
                    getIn(formik.errors, 'shippingInfo.address')
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname">Postcode</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="shippingInfo.postCode"
                  name="shippingInfo.postCode"
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'shippingInfo.postCode') &&
                    Boolean(getIn(formik.errors, 'shippingInfo.postCode'))
                  }
                  helperText={
                    getIn(formik.touched, 'shippingInfo.postCode') &&
                    getIn(formik.errors, 'shippingInfo.postCode')
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname">City</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="shippingInfo.city"
                  name="shippingInfo.city"
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'shippingInfo.city') &&
                    Boolean(getIn(formik.errors, 'shippingInfo.city'))
                  }
                  helperText={
                    getIn(formik.touched, 'shippingInfo.city') &&
                    getIn(formik.errors, 'shippingInfo.city')
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname">Country</p>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="shippingInfo.country"
                  name="shippingInfo.country"
                  onChange={formik.handleChange}
                  error={
                    getIn(formik.touched, 'shippingInfo.country') &&
                    Boolean(getIn(formik.errors, 'shippingInfo.country'))
                  }
                  helperText={
                    getIn(formik.touched, 'shippingInfo.country') &&
                    getIn(formik.errors, 'shippingInfo.country')
                  }
                />
              </Grid>
              <h6 className="checkout__subheading checkout__subheading--margin-top checkout__subheading--margin-bottom">
                PAYMENT DETAILS
              </h6>
              <Grid item xs={12} md={6}>
                <p className="checkout__fieldname checkout__fieldname--no-margin-top">
                  Payment method
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="checkout__radio-btn-container">
                  <label className="checkout__radio-label">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'emoney'}
                      className="checkout__radio-btn"
                      onChange={() => {
                        setPaymentMethod('emoney');
                      }}
                    />
                    E-money
                  </label>
                </div>
                <br />

                <div className="checkout__radio-btn-container">
                  <label className="checkout__radio-label">
                    <input
                      type="radio"
                      className="checkout__radio-btn"
                      onChange={() => {
                        setPaymentMethod('cash');
                      }}
                      checked={paymentMethod === 'cash'}
                      name="payment"
                    />
                    Cash on delivery
                  </label>
                </div>
              </Grid>
              {paymentMethod === 'emoney' && (
                <>
                  {' '}
                  <Grid item xs={12} md={6}>
                    <p className="checkout__fieldname">e-Money number</p>

                    <TextField
                      fullWidth
                      variant="outlined"
                      id="paymentDetails.number"
                      name="paymentDetails.number"
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, 'paymentDetails.number') &&
                        Boolean(getIn(formik.errors, 'paymentDetails.number'))
                      }
                      helperText={
                        getIn(formik.touched, 'paymentDetails.number') &&
                        getIn(formik.errors, 'paymentDetails.number')
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <p className="checkout__fieldname">e-Money PIN</p>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="paymentDetails.pin"
                      name="paymentDetails.pin"
                      onChange={formik.handleChange}
                      error={
                        getIn(formik.touched, 'paymentDetails.pin') &&
                        Boolean(getIn(formik.errors, 'paymentDetails.pin'))
                      }
                      helperText={
                        getIn(formik.touched, 'paymentDetails.pin') &&
                        getIn(formik.errors, 'paymentDetails.pin')
                      }
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </div>
          <div className="checkout__summary-container checkout__summary-container--one-third-width">
            <CheckoutSummary />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}

// when the button is pressed in checkout summary, to send this to context, which will then
// update state in the checkout component which will then trigger the button via a ref,
// if all the values are then the oncifrmation will be shown
