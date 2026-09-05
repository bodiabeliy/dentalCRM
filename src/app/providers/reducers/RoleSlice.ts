import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IRoles } from '../types/role'
import type { RootState } from '../store'

export interface rolestate {
  currentRole: IRoles
  isLoading: boolean
  isError: boolean
  notificationMessage: string
}

const initialState: rolestate = {
  isLoading: false,
  isError: false,
  notificationMessage: '',
  currentRole: {
    items: [],
  } as IRoles,
}

export const rolestate = createSlice({
  name: 'role',
  initialState,
  reducers: {
    getRoles: (state, action: PayloadAction<IRoles>) => {
      state.currentRole = action.payload
    },
  },
})

export const { getRoles } = rolestate.actions

export const rolesSelector = (state: RootState) => state.RoleReducer.currentRole

export default rolestate.reducer
