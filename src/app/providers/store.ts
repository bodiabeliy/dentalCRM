import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserReducer from './reducers/UserSlice'
import ClinicReducer from './reducers/ClinicSlice'
import StaffReducer from './reducers/StaffSlice'
import RoleReducer from './reducers/RoleSlice'
import SubClinicReducer from './reducers/SubClinicSlice'
import PricingReducer from './reducers/PricingSlice'

const rootReducer = combineReducers({
  UserReducer,
  ClinicReducer,
  StaffReducer,
  RoleReducer,
  SubClinicReducer,
  PricingReducer,
})

export const store = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  })
}
export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
