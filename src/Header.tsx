import { useAction, useAtom } from '@reatom/npm-react'
import { ROUTEST, usernameAtom } from './model'

export const Header = () => {
  const [username] = useAtom(usernameAtom)
  const handleLogOut = useAction((ctx) => {
    usernameAtom(ctx, '')
    ROUTEST.login.goTo(ctx)
  })

  return (
    <header>
      <span>{username}</span>{' '}
      <button onClick={handleLogOut} title="logout" className="logout">
        ⅹ
      </button>
    </header>
  )
}
