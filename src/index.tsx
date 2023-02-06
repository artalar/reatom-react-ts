import React from 'react'
import ReactDOM from 'react-dom/client'
import { createCtx, connectLogger } from '@reatom/framework'
import { reatomContext } from '@reatom/npm-react'
import { createBrowserHistory } from 'history'
import App from './App'
import { historyAtom } from '@reatom/npm-history'

const ctx = createCtx()
connectLogger(ctx)
historyAtom(ctx, createBrowserHistory())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <reatomContext.Provider value={ctx}>
    <App />
  </reatomContext.Provider>,
)
