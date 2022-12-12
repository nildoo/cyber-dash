import { DashboardOutlined } from '@ant-design/icons'
import { GroupType } from '../@types/cyber'

const icons = {
  DashboardOutlined
}

const dashboard: GroupType = {
  id: 'group-dashboard',
  title: 'Início',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    }
  ]
}

export default dashboard
