// this is the most common model for the whole app

import { atom } from '@reatom/framework'
import { withLocalStorage } from '@reatom/persist-web-storage'

export const usernameAtom = atom('', 'usernameAtom').pipe(
  withLocalStorage('USER'),
)
