import React from 'react'
import { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const useFormFactory = (schema, values, errors, handleChange, isSubmitting) => {
  const nodes = JSON.parse(JSON.stringify(schema._nodes)).reverse()
  const refs = []
  let control = null
  let firstErrorRef = null
  const fields = nodes.map(name => {
    if (schema.fields[name]._meta) {
      const { type, label, className, ...rest } = schema.fields[name]._meta
      refs[name] = useRef()

      switch (type) {
        case 'DatePicker':
          control = (
            <label htmlFor={name} key={name}>
              {label}
              <DatePicker
                name={name}
                selected={values[name]}
                onChange={date => handleChange(name, date)}
                ref={refs[name]}
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
                ref={refs[name]}
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
                ref={refs[name]}
                {...rest}
              />
              <span className="errors">{errors[name]}</span>
            </label>
          )
          break
      }
    }
    if (isSubmitting && errors[name] && !firstErrorRef) {
      firstErrorRef = refs[name]
    }
    return control
  })

  return { fields, firstErrorRef }
}

export default useFormFactory
