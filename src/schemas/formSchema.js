import * as yup from 'yup'
import dayjs from 'dayjs'

let twoDaysAgo = dayjs(new Date())
  .subtract(2, 'day')
  .format('YYYY-MM-DD')

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
  date: yup
    .date()
    .required()
    .min(twoDaysAgo)
    .max(new Date())
    .typeError('A Date in last 48 hours is required')
    .meta({
      type: 'DatePicker',
      label: 'Date Picker',
      minDate: new Date(twoDaysAgo),
      maxDate: new Date(),
      dateFormat: 'dd/MM/yyyy',
      todayButton: 'Today',
      withPortal: true
    }),
  standardDate: yup
    .date()
    .required()
    .min(twoDaysAgo)
    .max(new Date())
    .typeError('A Date in last 48 hours is required')
    .meta({
      type: 'date',
      label: 'Date Standard',
      min: dayjs(new Date(twoDaysAgo)).format('YYYY-MM-DD'),
      max: dayjs(new Date()).format('YYYY-MM-DD')
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
    })
})

export default schema
