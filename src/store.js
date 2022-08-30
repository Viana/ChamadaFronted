import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import chamadaReducer from './slices/chamadaSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        chamada:chamadaReducer,
    },
})