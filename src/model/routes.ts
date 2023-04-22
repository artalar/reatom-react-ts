import { action, atom, onConnect } from '@reatom/framework'
import { historyAtom } from '@reatom/npm-history'

import { usernameAtom } from './user'

// a classic fabric example
// you could use any [history](https://www.npmjs.com/package/history) compatible package, like react-router
const reatomRoute = (name: string) =>
  Object.assign(
    // eslint-disable-next-line @reatom/atom-rule
    atom(
      (ctx) => ctx.spy(historyAtom.location).pathname.endsWith(name),
      `reatomRoute#${name}`,
    ),
    {
      goTo: action(
        (ctx) => historyAtom.push(ctx, `/${name}`),
        `reatomRoute#${name}.goTo`,
      ),
    },
  )

export const ROUTEST = {
  login: reatomRoute('login'),
  search: reatomRoute('search'),
}

// handle initialization
onConnect(historyAtom.location, (ctx) => {
  if (ctx.get(usernameAtom) === '') ROUTEST.login.goTo(ctx)
})
