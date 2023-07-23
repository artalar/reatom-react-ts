export const Header = ({
  username,
  onLogout,
}: {
  username: string
  onLogout: () => void
}) => {
  return (
    <header>
      <span>{username}</span>{' '}
      <button onClick={onLogout} title="logout" className="logout">
        ⅹ
      </button>
    </header>
  )
}
