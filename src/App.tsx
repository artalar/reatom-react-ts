import { useAtom } from '@reatom/npm-react'
import { usernameAtom } from './features/model'
import { Login } from './features/Login'
import { Home } from './features/Home'
import { Header } from './ui/Header'

export const App = () => {
  const [username, setUsername] = useAtom(usernameAtom)

  return (
    <main>
      {username === '' ? (
        <Login />
      ) : (
        <>
          <Header
            username={username}
            onLogout={() => {
              setUsername('')
            }}
          />
          <hr />
          <section>
            <Home />
          </section>
        </>
      )}
    </main>
  )
}
