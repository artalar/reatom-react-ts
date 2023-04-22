import {
  atom,
  reatomAsync,
  withAbort,
  withCache,
  withDataAtom,
  withRetry,
  onUpdate,
  sleep,
} from '@reatom/framework'
import { useAtom } from '@reatom/npm-react'
import * as api from '~/api'

const searchAtom = atom('', 'searchAtom')

const fetchIssues = reatomAsync(async (ctx, query: string) => {
  await sleep(350)
  const { items } = await api.fetchIssues(query, ctx.controller)
  return items
}, 'fetchIssues').pipe(
  withDataAtom([]),
  withCache({ length: 50, swr: false }),
  withAbort({ strategy: 'last-in-win' }),
  withRetry({
    onReject(ctx, error, retries) {
      return error instanceof Error && error.message.includes('rate limit')
        ? 100 * Math.min(500, retries ** 2)
        : -1
    },
  }),
)
onUpdate(searchAtom, fetchIssues)

export const Search = () => {
  const [search, setSearch] = useAtom(searchAtom)
  const [issues] = useAtom(fetchIssues.dataAtom)
  // you could create computed atoms directly in `useAtom`
  const [isLoading] = useAtom((ctx) => {
    // check the console and inspect nested `cause`s!
    // console.log(ctx)
    return (
      ctx.spy(fetchIssues.pendingAtom) + ctx.spy(fetchIssues.retriesAtom) > 0
    )
  })

  return (
    <section>
      <input
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search"
      />
      {isLoading && 'Loading...'}
      <br />
      <br />
      {issues.length === 0 ? (
        <span>No issues</span>
      ) : (
        <ul>
          {issues.map(
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ({ title, html_url, id }) => (
              <li key={id}>
                {title} [
                <a href={html_url} target="_blank" rel="noreferrer">
                  link
                </a>
                ]
              </li>
            ),
          )}
        </ul>
      )}
    </section>
  )
}
