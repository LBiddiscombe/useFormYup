import React from 'react'
import useForm from '../hooks/useForm'

const Form = ({ name, schema, onSubmit, children }) => {
  const { fields, handleSubmit } = useForm(children, schema, onSubmit)

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
