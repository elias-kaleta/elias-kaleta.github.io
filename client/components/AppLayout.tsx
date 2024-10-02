import { Outlet, useMatches } from 'react-router-dom'

import useDocumentTitle from '../hooks/useDocumentTitle'

function AppLayout() {
  const matches = useMatches()
  const pageTitle = matches[1].handle
  useDocumentTitle(pageTitle ? `${pageTitle}` : 'FlatBook')

  return (
    <>
      <section>
        <header></header>
        <main>
          <Outlet />
        </main>
      </section>
    </>
  )
}

export default AppLayout
