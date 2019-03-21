import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your name')
    .min(3)
    .max(12)
    .typeError('Enter your name')
    .meta({
      type: 'text',
      label: 'Name'
      //autoFocus: true
    }),
  price: yup
    .number()
    .required()
    .min(0.001)
    .max(1.499)
    .typeError('A grade price between £0.001 and £1.499 is required')
    .meta({
      type: 'number',
      label: 'Price'
    }),
  agree: yup
    .boolean()
    .meta({
      type: 'checkbox',
      label: 'Agree my terms'
    })
    // custom validation rule to ensure checked
    // .boolean().valid(true) as a standard rule should also work
    // Just showing it as a simple example
    .test('is-checked', 'you must agree to my terms', value => value)
})

export default schema
