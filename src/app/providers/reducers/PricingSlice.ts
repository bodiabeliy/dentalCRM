import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IPricing } from '../types/pricing'
import type { RootState } from '../store'

export interface PricingState {
  pricing: IPricing
  pricingList: IPricing[]
  isLoading: boolean
  isError: boolean
  notificationMessage: string
}

const initialState: PricingState = {
  pricing: {
    id: 0,
    name: '',
    price: 0,
    order: 0,
  },
  pricingList: [],
  isLoading: false,
  isError: false,
  notificationMessage: '',
}

export const PricingState = createSlice({
  name: 'pricing',
  initialState,
  reducers: {
    getPricing: (state, action: PayloadAction<IPricing[]>) => {
      state.pricingList = action.payload
    },
    getSPricing: (state, action: PayloadAction<IPricing>) => {
      state.pricing = action.payload
    },
  },
})

export const { getPricing, getSPricing } = PricingState.actions

export const pricingListSelector = (state: RootState) => state.PricingReducer.pricingList
export const pricingSelector = (state: RootState) => state.PricingReducer.pricing

export default PricingState.reducer
