/** When your routing ikword is too long, you can split it into small modules **/

import Layout from '@/layout'

const ikwordRouter = {
  path: '/ikword',
  component: Layout,
  redirect: '/ikword/manager-ikword',
  name: 'ikword',
  meta: {
    title: 'ikword',
    icon: 'excel'
  },
  children: [{
    path: 'manager-ikword',
    component: () => import('@/views/ikword/manager-ikword/index'),
    name: 'Managerikword',
    meta: {
      title: 'managerikword',
      icon: 'table'
    }
  },
  {
    path: 'manager-group',
    component: () => import('@/views/ikword/manager-group/index'),
    name: 'Managergroup',
    meta: {
      title: 'managergroup',
      icon: 'table'
    }
  }
  ]
}
export default ikwordRouter
