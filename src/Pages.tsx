import { useAtom, useCtx } from '@reatom/npm-react'
import { unstable_reatomRoutes, RouteAtom } from './reatomRoutes'

export const ROOT = unstable_reatomRoutes('/', {
  home: '',
  about: {
    contacts: '',
    location: '',
  },
  'blog/:article': '',
  'api/:version/:method': '',
  // FIXME infer '404' type, not ':404'
  ':404': '',
} as const)

const Home = () => (
  <section>
    <h2>Home</h2>
  </section>
)
const Contacts = () => (
  <section>
    <h2>Contacts</h2>
  </section>
)
const Location = () => (
  <section>
    <h2>Location</h2>
  </section>
)
const Blog = () => (
  <section>
    <h2>Blog</h2>
    <p>{useAtom(ROOT.routes.blog.routes.article.param)[0]}</p>
  </section>
)

const Link = ({ route, children }: { route: RouteAtom; children: any }) => {
  const ctx = useCtx()

  return (
    <a
      href={route.pathname}
      onClick={(e) => {
        e.preventDefault()
        route.go(ctx)
      }}
    >
      {children}
    </a>
  )
}

export const Pages = () => {
  const [routes] = useAtom((ctx) => ({
    isHome: ctx.spy(ROOT.routes.home),
    isContacts: ctx.spy(ROOT.routes.about.routes.contacts),
    isLocation: ctx.spy(ROOT.routes.about.routes.location),
    isBlog: ctx.spy(ROOT.routes.blog),
  }))

  console.log(routes)

  let children = <h1>404</h1>

  if (routes.isHome) children = <Home />
  if (routes.isContacts) children = <Contacts />
  if (routes.isLocation) children = <Location />
  if (routes.isBlog) children = <Blog />

  return (
    <main>
      <aside>
        <nav>
          <ul>
            <li>
              <Link route={ROOT.routes.home}>Home</Link>
            </li>
            <li>
              <Link route={ROOT.routes.about.routes.contacts}>Contacts</Link>
            </li>
            <li>
              <Link route={ROOT.routes.about.routes.location}>Location</Link>
            </li>
            <li>
              <Link route={ROOT.routes.blog}>Blog</Link>
            </li>
          </ul>
        </nav>
      </aside>
      {children}
    </main>
  )
}
