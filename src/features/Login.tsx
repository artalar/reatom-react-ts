import { action, atom } from '@reatom/framework'
import { useAction, useAtom } from '@reatom/npm-react'
import { usernameAtom } from '~/features/model'

const inputAtom = atom('', 'inputAtom')

const greetingAtom = atom((ctx) => {
  const input = ctx.spy(inputAtom)
  return input === '' ? '' : `Hello, ${input}!`
}, 'greetingAtom')

// a logic container
const onSubmit = action((ctx, event: React.FormEvent<HTMLFormElement>) => {
  void ctx.schedule(() => {
    event.preventDefault()
  })

  usernameAtom(ctx, ctx.get(inputAtom))
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
