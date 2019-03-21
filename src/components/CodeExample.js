import React from 'react'
import Highlight from 'react-highlight'

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

      <p>
        3a. Pass the schema and onSubmit handler to the form as props. By
        default the form will be generated from the schema provided.
      </p>
      <Highlight className="html">
        {`  <Form name="myFirstForm" schema={schema} onSubmit={onSubmit} />
`}
      </Highlight>
      <br />

      <p>
        3b. You can also provide a function as the form child if you want to
        override the use of the form factory. You'll have access to the
        following
        <ul>
          <li>
            refs - in form of refs.inputname, see example below. Attach a ref to
            enable auto focus for errors etc{' '}
          </li>
          <li>values - the current field values</li>
          <li>errors - the errors from yup validation</li>
          <li>handleChange - call to trigger the yup validation logic</li>
        </ul>
      </p>
      <Highlight className="html">
        {`  <Form name="myFirstForm" schema={schema} onSubmit={onSubmit}>
    {(errors, handleChange, refs) => (
      <>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            ref={refs.name}
            name="name"
            onChange={e => handleChange('name', e.target.value)}
          />
          <span className="errors">{errors['name']}</span>
        </label>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            onChange={e => handleChange('agree', Boolean(e.target.checked))}
            ref={refs.agree}
          />
          <label htmlFor="agree">
            Agree my terms
            <br />
          </label>
          <span className="errors">{errors['agree']}</span>
        </div>
      </>
    )}
  </Form>
`}
      </Highlight>
      <br />
    </div>
  )
}

export default CodeExample
