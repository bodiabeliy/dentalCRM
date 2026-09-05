import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IUser } from '../types/user'
import type { RootState } from '../store'

export interface userState {
  user: IUser
  isAuth: boolean
  isLoading: boolean
  isError: boolean
  notificationMessage: string
}

const initialState: userState = {
  user: {
    firstname: '',
    lastname: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    photo: '',
    languge: 'UKR',
  } as unknown as IUser,
  isAuth: false,
  isLoading: false,
  isError: false,
  notificationMessage: '',
}

export const userState = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    getCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    getCurrentUserSuccess: (state) => {
      state.isError = false
    },
    getCurrentUserNotification: (state, action: PayloadAction<string>) => {
      state.notificationMessage = action.payload
      state.isError = true
    },

    isAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getCurrentUser, isAuth, getCurrentUserLoading, getCurrentUserSuccess, getCurrentUserNotification } =
  userState.actions

export const userSelector = (state: RootState) => state.UserReducer.user
export const isUserAuthSelector = (state: RootState) => state.UserReducer.isAuth
export const notificationMessageSelector = (state: RootState) => state.UserReducer.notificationMessage
export const isErrorSelector = (state: RootState) => state.UserReducer.isError

export default userState.reducer
