import { useState } from 'react'
import * as yup from 'yup'

const useForm = (callback, schema) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (name, event) => {
    if (event) {
      setIsSubmitting(true)
      event.preventDefault()
      schema
        .validate(values, { abortEarly: false })
        .then(() => callback(name, values)) //should this be in a useEffect or useCallback instead?
        .catch(err => setErrors(transformYupErrors(err)))
    }
  }

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value })
    setIsSubmitting(false)
    const fieldschema = yup.reach(schema, name)
    fieldschema
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => {
        setErrors({ ...errors, [name]: err.errors[0] })
      })
  }

  return {
    handleSubmit,
    handleChange,
    values,
    errors,
    isSubmitting
  }
}

const transformYupErrors = err => {
  let messages = {}
  err.inner.forEach(e => {
    messages = Object.assign(messages, { [e.path]: e.errors[0] })
  })
  return messages
}

export default useForm
