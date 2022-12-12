import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import {
  FileUploadOutlined,
  Campaign,
  AppRegistration,
  SupportAgent
} from '@mui/icons-material'
import { GroupType } from '../@types/cyber'

const icons = {
  TeamOutlined,
  FileUploadOutlined,
  Campaign,
  AppRegistration,
  SupportAgent,
  UserOutlined
}

const pages: GroupType = {
  id: 'consultant',
  title: 'Consultor',
  type: 'group',
  children: [
    {
      id: 'clients',
      title: 'Clientes',
      type: 'item',
      url: '/clients',
      icon: icons.TeamOutlined,
      target: false
    },
    {
      id: 'myaccount',
      title: 'Minha conta',
      type: 'item',
      url: '/myaccount',
      icon: icons.UserOutlined,
      target: false
    },
    {
      id: 'consultants',
      title: 'Consultores',
      type: 'item',
      url: '/consultants',
      icon: icons.TeamOutlined,
      target: false
    },
    {
      id: 'allchats',
      title: 'Suporte',
      type: 'item',
      url: '/support/chats',
      icon: icons.SupportAgent,
      target: false
    }
  ]
}

export default pages
