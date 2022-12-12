import React from 'react'
import { styled } from '@mui/material/styles'
import { MainCard } from '../../components/MainCard'
import ComponentSkeleton from './ComponentSkeleton'

const IFrameWrapper = styled('iframe')(() => ({
  height: 'calc(100vh - 210px)',
  border: 'none'
}))

const AntIcons = () => (
  <ComponentSkeleton>
    <MainCard title="Ant Icons">
      <IFrameWrapper title="Ant Icon" width="100%" src="https://ant.design/components/icon/" />
    </MainCard>
  </ComponentSkeleton>
)

export default AntIcons
