import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const formFactory = (schema, values, errors, handleChange, inputRefs) => {
  const nodes = JSON.parse(JSON.stringify(schema._nodes)).reverse()
  let control = null
  if (inputRefs) {
    const fields = nodes.map(name => {
      if (schema.fields[name]._meta) {
        const { type, label, className, ...rest } = schema.fields[name]._meta
        switch (type) {
          case 'DatePicker':
            control = (
              <label htmlFor={name} key={name}>
                {label}
                <DatePicker
                  name={name}
                  selected={values[name]}
                  onChange={date => handleChange(name, date)}
                  ref={inputRefs[name]}
                  {...rest}
                />
                <span className="errors">{errors[name]}</span>
              </label>
            )
            break

          case 'checkbox':
            control = (
              <div className="checkbox-wrapper" key={name}>
                <input
                  type={type}
                  id={name}
                  name={name}
                  onChange={e => handleChange(name, Boolean(e.target.checked))}
                  ref={inputRefs[name]}
                  {...rest}
                />
                <label htmlFor={name}>
                  {label}
                  <br />
                </label>
                <span className="errors">{errors[name]}</span>
              </div>
            )
            break

          default:
            control = (
              <label htmlFor={name} key={name}>
                {label}
                <input
                  type={type}
                  id={name}
                  name={name}
                  onChange={e => handleChange(name, e.target.value)}
                  ref={inputRefs[name]}
                  {...rest}
                />
                <span className="errors">{errors[name]}</span>
              </label>
            )
            break
        }
      }
      return control
    })
    return fields
  }
  return { fields: [] }
}

export default formFactory
