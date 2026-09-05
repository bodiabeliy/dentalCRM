import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IStaff } from '../types/stuff'
import type { RootState } from '../store'

export interface staffState {
  staffs: IStaff[]
  staff: IStaff
  staffColor: string
  totalRows: number
  isLoading: boolean
}

const initialState: staffState = {
  staffs: [],
  staff: {
    firstname: '',
    lastname: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    photo: '',
  } as unknown as IStaff,
  staffColor: '',
  totalRows: 0,
  isLoading: false,
}

export const staffState = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    getStuffs: (state, action: PayloadAction<IStaff[]>) => {
      state.staffs = action.payload
    },
    getCurrentStuff: (state, action: PayloadAction<IStaff>) => {
      state.staff = action.payload
    },
    getTotalRows: (state, action: PayloadAction<number>) => {
      state.totalRows = action.payload
    },

    getStaffColor: (state, action: PayloadAction<string>) => {
      state.staffColor = action.payload
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getStuffs, getCurrentStuff, getTotalRows, getStaffColor, isLoading } = staffState.actions

export const staffSelector = (state: RootState) => state.StaffReducer.staff
export const staffsSelector = (state: RootState) => state.StaffReducer.staffs
export const totalRowsSelector = (state: RootState) => state.StaffReducer.totalRows
export const staffColorSelector = (state: RootState) => state.StaffReducer.staffColor

export const isLoadingSelector = (state: RootState) => state.StaffReducer.isLoading

export default staffState.reducer
