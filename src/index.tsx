import React from 'react'
import ReactDOM from 'react-dom/client'
import { createCtx, connectLogger } from '@reatom/framework'
import { historyAtom } from '@reatom/npm-history'
import { reatomContext } from '@reatom/npm-react'
import { createBrowserHistory } from 'history'
import { App } from './App'
import './index.css'

const ctx = createCtx()
historyAtom(ctx, createBrowserHistory())
connectLogger(ctx)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <reatomContext.Provider value={ctx}>
      <App />
    </reatomContext.Provider>
  </React.StrictMode>,
)
