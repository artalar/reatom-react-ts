import { reatomComponent } from '@reatom/npm-react'
import { greetingAtom, login, nameAtom } from './model'

export const Auth = reatomComponent(({ ctx }) => {
  return (
    <section className="auth">
      <header>
        <h1>Auth</h1>
      </header>
      <form onSubmit={ctx.bind(login)}>
        <input
          value={ctx.spy(nameAtom)}
          placeholder="Your name"
          onChange={(e) => nameAtom(ctx, e.currentTarget.value)}
        />
        <button type="submit">Submit</button>
        <p>{ctx.spy(greetingAtom)}</p>
      </form>
    </section>
  )
}, 'Auth')
