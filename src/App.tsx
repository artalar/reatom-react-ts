import { match } from '@reatom/framework'
import { reatomComponent } from '@reatom/npm-react'
import { urlAtom } from '@reatom/url'
import { isLoggedAtom, logout } from './features/model'
import { Auth } from './features/Auth'
import { Home } from './features/Home'
import { Profile } from './features/Profile'
import { Header } from './ui/Header'
import './index.css'

export const routes = match(isLoggedAtom)
  .default(() => <Auth />)
  .truthy(
    match((ctx) => ctx.spy(urlAtom).pathname)
      .is('/me', () => <Profile />)
      .default(() => <Home />),
  )

export const App = reatomComponent(
  ({ ctx }) => (
    <main>
      {ctx.spy(isLoggedAtom) && (
        <Header
          nav={[
            { name: 'Home', path: '/' },
            { name: 'Profile', path: '/me' },
          ]}
          logout={() => logout(ctx)}
        />
      )}
      {ctx.spy(routes)}
    </main>
  ),
  'App',
)
