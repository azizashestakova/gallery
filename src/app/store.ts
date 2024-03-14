import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"

import { apiService } from "@/services/api"

import authReducer from "@/features/auth/authSlice"
import notificationReducer from "@/features/notification/notificationSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  [apiService.reducerPath]: apiService.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
