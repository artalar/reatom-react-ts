export type HeaderProps = {
  nav: Array<{ name: string; path: string }>
  logout: () => void
}

export const Header = ({ nav, logout }: HeaderProps) => (
  <header className="head">
    <nav>
      <ul>
        {nav.map(({ name, path }) => (
          <li key={name}>
            <a href={path}>{name}</a>
          </li>
        ))}
      </ul>
    </nav>
    <button
      className="logout"
      onClick={logout}
      title="Logout"
      aria-description="Logout"
    >
      X
    </button>
  </header>
)
