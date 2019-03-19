import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(12)
    .typeError('Enter your name')
    .meta({
      // type & label are required
      type: 'text',
      label: 'Name'
      // optionally add Component props or HTML Input attributes here
    }),
  agree: yup
    .boolean()
    .meta({
      type: 'checkbox',
      label: 'Agree my terms'
    })
    // optionally add custom validation rules
    .test('is-checked', 'you must agree to my terms', value => value)
})

export default schema
