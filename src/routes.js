export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./views/Home.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/adminTeachers',
    name: 'adminTeachers',
    component: () => import('./views/AdminProfe.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/adminStudents',
    name: 'adminStudents',
    component: () => import('./views/AdminStudents.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/studentPicker',
    name: 'studentPicker',
    component: () => import('./views/StudentPicker.vue'),
  },
  {
    path: '/gameAnimals',
    name: 'gameAnimals',
    component: () => import('./views/games/GameAnimals.vue'),
  },
  {
    path: '/gameNumbers',
    name: 'gameNumbers',
    component: () => import('./views/games/GameNumbers.vue'),
  },
  {
    path: '/gameSizes',
    name: 'gameSizes',
    component: () => import('./views/games/GameSizes.vue'),
  },
  {
    path: '/gameColors',
    name: 'gameColors',
    component: () => import('./views/games/GameColors.vue'),
  },
  {
    path: '/gameMemory',
    name: 'gameMemory',
    component: () => import('./views/games/GameMemory.vue'),
  },
  {
    path: '/adminGames',
    name: 'adminGames',
    component: () => import('./views/AdminGames.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('./views/Statistics.vue'),
    meta: {requiresAuth: true}
  }
]
