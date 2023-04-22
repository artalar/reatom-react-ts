import { atom, noop, onUpdate, withInit } from '@reatom/framework'

const SNAPSHOT_KEY = 'usernameAtom'

export const usernameAtom = atom('', 'usernameAtom').pipe(
  // async initialization
  withInit(() => localStorage.getItem(SNAPSHOT_KEY) ?? ''),
)
// additional reactive logic
onUpdate(usernameAtom, (ctx, username) => {
  // safe side-effect
  ctx
    .schedule(() => {
      localStorage.setItem(SNAPSHOT_KEY, username)
    })
    .catch(noop)
})
