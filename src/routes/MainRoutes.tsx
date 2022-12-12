/* eslint-disable */
import React, { lazy } from 'react'

import Loadable from '../components/Loadable'
import MainLayout from '../layout/MainLayout'

const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')))
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')))
const Color = Loadable(lazy(() => import('../pages/components-overview/Color')))

const ChatsSupport = Loadable(lazy(() => import('../pages/components-overview/AllChats')))

const Consultants = Loadable(lazy(() => import('../pages/components-overview/Consultants')))
const AddConsultant = Loadable(lazy(() => import('../pages/components-overview/Consultants/add')))

const MyAccount = Loadable(lazy(() => import('../pages/components-overview/Account')))

const Clients = Loadable(lazy(() => import('../pages/components-overview/Clients')))
const AddClient = Loadable(lazy(() => import('../pages/components-overview/Clients/add')))
const ClientDetail = Loadable(lazy(() => import('../pages/components-overview/Clients/detail')))
const AddCampaing = Loadable(lazy(() => import('../pages/components-overview/Clients/addCampaing')))
const ClientCampaings = Loadable(lazy(() => import('../pages/components-overview/Clients/campaings')))
const CampaingDetail = Loadable(lazy(() => import('../pages/components-overview/Clients/campaingDetail')))
const CampaingImages = Loadable(lazy(() => import('../pages/components-overview/Clients/CampaingImages')))
const CampaingVideos = Loadable(lazy(() => import('../pages/components-overview/Clients/CampaingVideos')))
const CampaingImagesClient = Loadable(lazy(() => import('../pages/components-overview/Clients/CampaingImagesClient')))

const Chat = Loadable(lazy(() => import('../pages/components-overview/Chat')))
const Error404 = Loadable(lazy(() => import('../pages/components-overview/404')))

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/myaccount',
      element: <MyAccount />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'support/chats',
      element: <ChatsSupport />
    },
    {
      path: 'consultants',
      element: <Consultants />
    },
    {
      path: 'consultants/add',
      element: <AddConsultant />
    },
    {
      path: 'clients',
      element: <Clients />
    },
    {
      path: 'clients/add',
      element: <AddClient />
    },
    {
      path: 'clients/:id/campaings',
      element: <ClientCampaings />
    },
    {
      path: 'clients/:id/campaings/add',
      element: <AddCampaing />
    },
    {
      path: 'clients/:id/campaings/:id',
      element: <CampaingDetail />
    },
    {
      path: 'clients/:id/campaings/:id/chat/:id',
      element: <Chat />
    },
    {
      path: 'clients/:id/campaings/:id/images/:id',
      element: <CampaingImages />
    },
    {
      path: 'clients/:id/campaings/:id/videos/:id',
      element: <CampaingVideos />
    },
    {
      path: 'clients/:id/campaings/:id/signatures/:id',
      element: <CampaingImagesClient />
    },
    {
      path: 'clients/detail/:id',
      element: <ClientDetail />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: '*',
      element: <Error404 />
    },
  ]
}

export default MainRoutes
