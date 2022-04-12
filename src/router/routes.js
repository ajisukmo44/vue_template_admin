import store from '@/state/store'

export default [
  {
    path: '',
    name: 'home',
    meta: { authRequired: true },
    component: () => import('./view/dashboards/crypto/index.vue'),
  },
  {
    path: '/profile-user',
    name: 'profile-user',
    meta: { authRequired: true },
    component: () => import('./view/user/profile-user'),
  },
  {
    path: '/user-management',
    name: 'user-management',
    meta: { authRequired: true },
    component: () => import('./view/user/user'),
  },
  {
    path: '/region',
    name: 'region',
    meta: { authRequired: true },
    component: () => import('./view/region/region'),
  },
  {
    path: '/package',
    name: 'package',
    meta: { authRequired: true },
    component: () => import('./view/package/package'),
  },
  {
    path: '/classification',
    name: 'classification',
    meta: { authRequired: true },
    component: () => import('./view/classification/classification'),
  },
  {
    path: '/change-password',
    name: 'change-password',
    meta: { authRequired: true },
    component: () => import('./view/user/change-password'),
  },
  {
    path: '/live-chat',
    name: 'live-chat',
    meta: { authRequired: true },
    component: () => import('./view/chat/live-chat'),
  },
  {
    path: '/agent-management',
    name: 'agent-management',
    meta: { authRequired: true },
    component: () => import('./view/agent/agent-management'),
  },
  {
    path: '/agent-management-detail/:id',
    name: 'agent-management-detail',
    meta: { authRequired: true },
    component: () => import('./view/agent/agent-management-detail'),
  },
  {
    path: '/customer-management',
    name: 'customer-management',
    meta: { authRequired: true },
    component: () => import('./view/customer/customer'),
  },
  {
    path: '/customer-management-detail/:id',
    name: 'customer-management-detail',
    meta: { authRequired: true },
    component: () => import('./view/customer/customer-management-detail'),
  },
  {
    path: '/case-management',
    name: 'case-management',
    meta: { authRequired: true },
    component: () => import('./view/case/case-management'),
  },
  {
    path: '/case-management-detail/:id',
    name: 'case-management-detail',
    meta: { authRequired: true },
    component: () => import('./view/case/case-management-detail'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./view/account/login'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.state.authBackend.status.loggeduser) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./view/account/register'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/forgot-password',
    name: 'Forgot password',
    component: () => import('./view/account/forgot-password'),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' })
        } else {
          // Continue to the login page
          next()
        }
      },
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          store.dispatch('auth/logOut')
        } else {
          store.dispatch('authBackend/logout')
        }
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          (route) => route.push('/login')
        )
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'default' } : { ...routeFrom })
      },
    },
  },

]
