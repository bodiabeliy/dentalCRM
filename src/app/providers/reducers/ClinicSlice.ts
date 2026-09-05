import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IClinic, IClinicInvite, IClinicReferences } from '../types/clinic'
import type { RootState } from '../store'

export interface clinicState {
  currentClinic: IClinic
  clinics: IClinic[]
  referencies: IClinicReferences
  clinicLogo: string
  clinicId: string
  invites: IClinicInvite[]
  invite: IClinicInvite
  isLoading: boolean
  isError: boolean
  notificationMessage: string
}

const initialState: clinicState = {
  clinics: [],
  invites: [],
  referencies: {},
  invite: {
    email: '',
    role: '',
    firstname: '',
    surname: '',
    lastname: '',
    id: 0,
  },
  currentClinic: {
    id: '',
    name: '',
    sub_name: '',
    logo: '',
    currenciesIso: [],
    mainCurrencyIso: '',
    sub_address: '',
  },
  clinicId: '',
  clinicLogo: '', // for test
  isLoading: false,
  isError: false,
  notificationMessage: '',
}

export const clinicState = createSlice({
  name: 'clinic',
  initialState,
  reducers: {
    getCurrentClinicLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    getClinics: (state, action: PayloadAction<IClinic[]>) => {
      state.clinics = action.payload
    },
    getCurrentClinic: (state, action: PayloadAction<IClinic>) => {
      state.currentClinic = action.payload
    },

    getCurrentclinicNotification: (state, action: PayloadAction<string>) => {
      state.notificationMessage = action.payload
      state.isError = true
    },

    createLogo: (state, action: PayloadAction<string>) => {
      state.clinicLogo = action.payload
      state.currentClinic.logo = action.payload
    },

    // invities
    createClinicInvite: (state, action: PayloadAction<IClinicInvite>) => {
      state.invite = action.payload
    },
    getClinicInvities: (state, action: PayloadAction<IClinicInvite[]>) => {
      state.invites = action.payload
    },
    getCClinicInvite: (state, action: PayloadAction<IClinicInvite>) => {
      state.invite = action.payload
    },

    getClinicReferencies: (state, action: PayloadAction<IClinicReferences>) => {
      state.referencies = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getCurrentClinic,
  getClinics,
  getCurrentClinicLoading,
  getCurrentclinicNotification,
  createLogo,

  createClinicInvite,
  getCClinicInvite,
  getClinicInvities,

  getClinicReferencies,
} = clinicState.actions

export const clinicsSelector = (state: RootState) => state.ClinicReducer.clinics
export const clinicSelector = (state: RootState) => state.ClinicReducer.currentClinic

export const clinicLogoSelector = (state: RootState) => state.ClinicReducer.clinicLogo

export const clinicInviteSelector = (state: RootState) => state.ClinicReducer.invite
export const clinicInvitesSelector = (state: RootState) => state.ClinicReducer.invites

export const clinicRefernciesSelector = (state: RootState) => state.ClinicReducer.referencies

export const notificationMessageSelector = (state: RootState) => state.ClinicReducer.notificationMessage
export const isErrorSelector = (state: RootState) => state.ClinicReducer.isError

export default clinicState.reducer
