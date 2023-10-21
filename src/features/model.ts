import { action, atom } from '@reatom/framework'
import { withLocalStorage } from '@reatom/persist-web-storage'
import { urlAtom, withSearchParamsPersist } from '@reatom/url'

export const nameAtom = atom('', 'nameAtom').pipe(
  withSearchParamsPersist('name'),
)
export const greetingAtom = atom(
  (ctx) => (ctx.spy(nameAtom) ? `Hello, ${ctx.spy(nameAtom)}!` : ''),
  'greetingAtom',
)

export const isLoggedAtom = atom(true, 'isLoggedAtom').pipe(
  withLocalStorage('isLogged'),
)

export const login = action((ctx, event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  isLoggedAtom(ctx, true)
  urlAtom.go(ctx, '/home')
}, 'login')

export const logout = action((ctx) => {
  isLoggedAtom(ctx, false)
  urlAtom.go(ctx, '/')
}, 'logout')
