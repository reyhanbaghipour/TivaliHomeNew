import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'js-cookie';
import authSlice, { AuthSlice } from './auth';
import { authApi } from '@/services/auth';
import { citiesAndStatesApi } from '@/services/citiesAndStatesAndSexes';
import { dashboardApi } from '@/services/dashboard';
import { EducationalExperienceApi } from '@/services/educationalExperience';

const authPersistConfig = {
  key: 'auth',
  storage: new CookieStorage(Cookies, {
    expiration: {
      default: 365 * 86400, // # One Year For Expiration
    },
  }),
  whitelist: [
    'token',
    'fullName',
    'id',
    'imageUrl',
    'username',
    'password',
    'phoneNumber',
  ],
};

export const reducers = combineReducers({
  auth: persistReducer<AuthSlice>(authPersistConfig, authSlice),
  [authApi.reducerPath]: authApi.reducer,
  [citiesAndStatesApi.reducerPath]: citiesAndStatesApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [EducationalExperienceApi.reducerPath]: EducationalExperienceApi.reducer,
});
