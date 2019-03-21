import React, { useState, useEffect, useLayoutEffect, createRef } from 'react'
import * as yup from 'yup'
import formFactory from './formFactory'

const useForm = (children, schema, callback) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fields, setFields] = useState()
  const [refs, setRefs] = useState()

  // on first pass parse schema and generate
  // 1. build the refs to the objects in the schema
  // 2. generate the input fields
  // Note: useLayoutEffect as this will impact the DOM.
  // useEffect causes a flicker before fields built
  useLayoutEffect(
    () => {
      let refs = {}
      schema._nodes.forEach(name => {
        refs[name] = createRef()
      })
      setRefs(refs)
      if (children) {
        const childInputs = children
          ? React.Children.toArray(children(errors, handleChange, refs))
          : null
        setFields(childInputs)
      } else setFields(formFactory(schema, values, errors, handleChange, refs))
    },
    [schema, errors]
  )

  // if we have any errors set focus to the first error field
  useLayoutEffect(
    () => {
      if (isSubmitting && Object.keys(errors).length > 0 && errors[Object.keys(errors)[0]]) {
        const ref = refs[Object.keys(errors)[0]]
        console.log(`Form validation errors found, setting focus to "${Object.keys(errors)[0]}"`)
        if (ref.current) {
          if (ref.current.input) {
            ref.current.input.focus()
          } else if (ref.current) ref.current.focus()
        }
      }
    },
    [errors]
  )

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
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  return {
    fields,
    values,
    errors,
    handleSubmit,
    handleChange,
    isSubmitting,
    refs
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
