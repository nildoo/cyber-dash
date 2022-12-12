import { createSlice } from '@reduxjs/toolkit'
import { StateReduxProps } from '../../@types/cyber'

const initialState: StateReduxProps = {
  openItem: ['dashboard'],
  openComponent: 'buttons',
  drawerOpen: false,
  componentDrawerOpen: true
}

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem (state, action) {
      state.openItem = action.payload.openItem
    },

    activeComponent (state, action) {
      state.openComponent = action.payload.openComponent
    },

    openDrawer (state, action) {
      state.drawerOpen = action.payload.drawerOpen
    },

    openComponentDrawer (state, action) {
      state.componentDrawerOpen = action.payload.componentDrawerOpen
    }
  }
})

export default menu.reducer

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } =
  menu.actions
