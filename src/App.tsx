import { action, atom } from '@reatom/framework'
import { useAction, useAtom } from '@reatom/npm-react'
import './App.css'

// base mutable atom
const inputAtom = atom('', 'inputAtom')

// computed readonly atom
const greetingAtom = atom((ctx) => {
  const input = ctx.spy(inputAtom)
  return input === '' ? `Hello, ${input}!` : ''
}, 'greetingAtom')

// a logic container
const onSubmit = action((ctx) => {
  const greeting = ctx.get(greetingAtom)

  // side-effects should be scheduled
  // you could do it anywhere with `ctx`
  ctx
    .schedule(() => {
      alert(greeting)
    })
    .catch(() => {})
}, 'onSubmit')

export default function App() {
  const [input, setInput] = useAtom(inputAtom)
  const [greeting] = useAtom(greetingAtom)
  const handleSubmit = useAction(
    (ctx, event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit(ctx)
    },
  )

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reatom</h1>
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
