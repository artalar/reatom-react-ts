import { action, atom } from '@reatom/framework'
import { useAction, useAtom } from '@reatom/npm-react'
import { historyAtom } from '@reatom/npm-history'
import { usernameAtom } from '~/model'

// base mutable atom
const inputAtom = atom('', 'inputAtom')

// computed readonly atom
const greetingAtom = atom((ctx) => {
  const input = ctx.spy(inputAtom)
  return input === '' ? '' : `Hello, ${input}!`
}, 'greetingAtom')

// a logic container
const onSubmit = action((ctx, event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  usernameAtom(ctx, ctx.get(inputAtom))

  historyAtom.push(ctx, '/search')
}, 'onSubmit')

export const Login = () => {
  const [input, setInput] = useAtom(inputAtom)
  const [greeting] = useAtom(greetingAtom)
  const handleSubmit = useAction(onSubmit)

  return (
    <form className="login" onSubmit={handleSubmit}>
      <p>
        <input
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Your name"
        />
        <button type="submit">Submit</button>
      </p>
      <p>{greeting}</p>
    </form>
  )
}
