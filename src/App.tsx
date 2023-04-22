import { useAtom } from '@reatom/npm-react'
import { ROUTEST } from './model'
import { Login } from './features/Login'
import { Search } from './features/Search'
import { Header } from './Header'

export const App = () => {
  const [isLogin] = useAtom(ROUTEST.login)
  const [isSearch] = useAtom(ROUTEST.search)

  let route: JSX.Element
  if (isLogin) {
    route = <Login />
  } else if (isSearch) {
    route = (
      <>
        <Header />
        <hr />
        <section>
          <Search />
        </section>
      </>
    )
  }
  route ??= <Login />

  return <main>{route}</main>
}
