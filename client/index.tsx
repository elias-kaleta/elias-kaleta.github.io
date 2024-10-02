import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import { Auth0Provider } from '@auth0/auth0-react'
const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

const env_domain = import.meta.env.VITE_AUTH0_DOMAIN
const env_clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const env_audience = import.meta.env.VITE_AUTH0_AUDIENCE

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain={env_domain}
      clientId={env_clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: env_audience,
      }}
      cacheLocation="localstorage"
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
//TODO - once click register button, redirecturi
