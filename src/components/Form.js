import React from 'react'
import useForm from '../hooks/useForm'
import useFormFactory from '../hooks/useFormFactory'

const Form = ({ name, schema, onSubmit }) => {
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(onSubmit, schema)

  const { fields, firstErrorRef } = useFormFactory(
    schema,
    values,
    errors,
    handleChange,
    isSubmitting
  )

  // TODO: move this to useForm so it's part of the core forms support
  // even if we make factory optional and pass form fields as a render prop
  if (firstErrorRef) {
    if (firstErrorRef.current.input) {
      firstErrorRef.current.input.focus()
    } else if (firstErrorRef.current) firstErrorRef.current.focus()
  }

  return (
    <form autoComplete="off" noValidate onSubmit={event => handleSubmit(name, event)}>
      {fields}
      <p>
        <button type="submit">Submit</button>
      </p>
    </form>
  )
}

export default Form
