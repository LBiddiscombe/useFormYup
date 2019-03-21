import React from 'react'
import schema from '../schemas/renderPropSchema'
import Form from './Form'

const FormRenderProps = () => {
  return (
    <div>
      <h1>useForm with Factory</h1>
      <Form name="firstForm" schema={schema} onSubmit={onSubmit}>
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
            <label htmlFor="price">
              Price
              <input
                type="number"
                id="price"
                ref={refs.price}
                name="price"
                onChange={e => handleChange('price', e.target.value)}
              />
              <span className="errors">{errors['price']}</span>
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
    </div>
  )
}

function onSubmit(form, values) {
  console.log(form, values)
  alert(JSON.stringify(values, null, 2))
}

export default FormRenderProps
