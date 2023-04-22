/* --- CODEGEN --- */

export const fetchIssues = async (
  query: string,
  { signal }: { signal: AbortSignal },
): Promise<{
  items: Array<{ title: string; html_url: string; id: string }>
}> => {
  const response = await fetch(
    `https://api.github.com/search/issues?q=${query}&page=${1}&per_page=10`,
    { signal },
  )

  if (!response.ok) throw new Error(await response.text())

  return await response.json()
}
