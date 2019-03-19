import React from 'react'
import Highlight from 'react-highlight'

import Form from './Form'
import schema from '../schemas/codeExampleSchema'

function CodeExample() {
  return (
    <div className="App">
      <h1>Code Example</h1>
      <p>1. Create a yup schema</p>
      <Highlight className="javascript">
        {`  import * as yup from 'yup'

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
        label: 'Name',
        // optionally add Component props or HTML Input attributes
        autoFocus: true
      }),
    agree: yup
      .boolean()
      .meta({
        type: 'checkbox',
        label: 'Agree my terms'
      })
      // optionally add custom validation rules
      .test('is-checked', 'you must agree to my terms', value => value)
  })`}
      </Highlight>
      <br />
      <p>2. Create an onSubmit handler for the form</p>
      <Highlight className="javascript">
        {`  function onSubmit(form, values) {
    console.log(form, values)
  }
`}
      </Highlight>
      <br />
      <p>3. Pass the schema and onSubmit handler to the form as props</p>
      <Highlight className="javascript">
        {`  <Form name="myFirstForm" schema={schema} onSubmit={onSubmit} />
`}
      </Highlight>
      <Form name="secondForm" schema={schema} onSubmit={onSubmit} />
    </div>
  )
}

function onSubmit(form, values) {
  console.log(form, values)
  alert('Form submitted: ' + form + '\n' + JSON.stringify(values, null, 2))
}

export default CodeExample
