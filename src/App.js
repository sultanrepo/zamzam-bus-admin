import React, { Suspense, useEffect, lazy } from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'

import './scss/style.scss'
import './scss/examples.scss'
import withAuth from './hoc/withAuth'

// Lazy-loaded components
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

const Login = lazy(() => import('./views/pages/login/Login'))
const Register = lazy(() => import('./views/pages/register/Register'))
const Page404 = lazy(() => import('./views/pages/page404/Page404'))
const Page500 = lazy(() => import('./views/pages/page500/Page500'))

// Auth-wrapped layout
const AuthDefaultLayout = withAuth(DefaultLayout)

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-r--eact-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme')?.match(/^[A-Za-z0-9\s]+/)?.[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) return
    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={
          <Suspense fallback={<SpinnerFallback />}>
            <AuthDefaultLayout />
          </Suspense>
        }>
          <Route path="404" element={
            <Suspense fallback={<SpinnerFallback />}>
              <Page404 />
            </Suspense>
          } />
          <Route path="500" element={
            <Suspense fallback={<SpinnerFallback />}>
              <Page500 />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<SpinnerFallback />}>
              <Page404 />
            </Suspense>
          } />
        </Route>
        <Route path="login" element={
          <Suspense fallback={<SpinnerFallback />}>
            <Login />
          </Suspense>
        } />
        <Route path="register" element={
          <Suspense fallback={<SpinnerFallback />}>
            <Register />
          </Suspense>
        } />
        {/* <Route path="users/register" element={
          <Suspense fallback={<SpinnerFallback />}>

          </Suspense>
        } /> */}
      </>

    )
  )

  return <RouterProvider router={router} />
}

const SpinnerFallback = () => (
  <div className="pt-3 text-center">
    <CSpinner color="success" variant="grow" />
  </div>
)

export default App
