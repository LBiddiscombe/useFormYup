import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { TabGroup, Tab } from 'react-material-tabs'

import Form from './components/Form'
import CodeExample from './components/CodeExample'
import FormRenderProps from './components/FormRenderProps'
import './clmaterial.css'
import './styles.css'

import schema from './schemas/formSchema'

function App() {
  const [tab, setTab] = useState(1)
  return (
    <div className="App">
      <TabGroup>
        <Tab onClick={e => setTab(1)}>Example</Tab>
        <Tab onClick={e => setTab(2)}>Docs</Tab>
        <Tab onClick={e => setTab(3)}>Render Prop Example</Tab>
      </TabGroup>
      {tab === 1 && (
        <div>
          <h1>useForm with Factory</h1>
          <Form name="firstForm" schema={schema} onSubmit={onSubmit} />
        </div>
      )}
      {tab === 2 && <CodeExample />}
      {tab === 3 && <FormRenderProps />}
    </div>
  )
}

function onSubmit(form, values) {
  console.log(form, values)
  alert(JSON.stringify(values, null, 2))
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
