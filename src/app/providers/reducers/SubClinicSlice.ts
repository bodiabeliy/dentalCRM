import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ISubClinicDto } from '../types/clinic'
import type { RootState } from '../store'

export interface subClinictate {
  subClinics: ISubClinicDto[]
  currentSubClinic: ISubClinicDto
  isLoading: boolean
  isError: boolean
  notificationMessage: string
}

const initialState: subClinictate = {
  isLoading: false,
  isError: false,
  notificationMessage: '',
  subClinics: [],
  currentSubClinic: {} as ISubClinicDto,
}

export const subClinictate = createSlice({
  name: 'role',
  initialState,
  reducers: {
    getSubClinics: (state, action: PayloadAction<ISubClinicDto[]>) => {
      state.subClinics = action.payload
    },
    getSubClinic: (state, action: PayloadAction<ISubClinicDto>) => {
      state.currentSubClinic = action.payload
    },
  },
})

export const { getSubClinics, getSubClinic } = subClinictate.actions

export const subClinicSelector = (state: RootState) => state.SubClinicReducer.subClinics
export const subCurrentClinicSelector = (state: RootState) => state.SubClinicReducer.currentSubClinic

export default subClinictate.reducer
