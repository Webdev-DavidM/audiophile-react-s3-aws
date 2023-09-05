import * as yup from 'yup';

export const validationSchema = (paymentMethod) =>
  yup.object().shape({
    billingDetails: yup.object().shape({
      name: yup
        .string()
        .min(3)
        .required('Please enter an name, minimum 2 characters'),
      email: yup
        .string()
        .min(3)
        .required('Please enter a email address, minimum 3 characters'),
      phoneNumber: yup
        .string()
        .min(3)
        .required('Please enter a phone number, minimum 3 characters'),
    }),
    shippingInfo: yup.object().shape({
      address: yup
        .string()
        .min(3)
        .required('Please enter an address, minimum 3 characters'),
      postCode: yup
        .string()
        .min(3)
        .required('Please enter a postcode, minimum 3 characters'),
      city: yup
        .string()
        .min(3)
        .required('Please enter a city, minimum 3 characters'),
      country: yup
        .string()
        .min(3)
        .required('Please enter a country, minimum 3 characters'),
    }),
    //optional validation below if the user selects emoney as the payment method
    paymentDetails: yup.lazy(() => {
      if (paymentMethod === 'emoney') {
        return yup.object().shape({
          number: yup
            .string()
            .min(16)
            .max(16)
            .required('Please enter a a 16 digit number'),
          pin: yup
            .string()
            .min(4)
            .max(4)
            .required('Please enter a a 4 digit number'),
        });
      }
      return yup.mixed().notRequired();
    }),
  });
