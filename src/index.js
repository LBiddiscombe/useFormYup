import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { TabGroup, Tab } from 'react-material-tabs'

import Form from './components/Form'
import CodeExample from './components/CodeExample'
import './clmaterial.css'
import './styles.css'

import schema from './schemas/formSchema'

function App() {
  const [tab, setTab] = useState(1)
  return (
    <div className="App">
      <TabGroup>
        <Tab onClick={e => setTab(1)}>Example</Tab>
        <Tab onClick={e => setTab(2)}>Code</Tab>
      </TabGroup>
      {tab === 1 && (
        <div>
          <h1>useForm with Factory</h1>
          <Form name="firstForm" schema={schema} onSubmit={onSubmit} />
        </div>
      )}
      {tab === 2 && <CodeExample />}
    </div>
  )
}

function onSubmit(form, values) {
  console.log(form, values)
  alert(JSON.stringify(values, null, 2))
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
