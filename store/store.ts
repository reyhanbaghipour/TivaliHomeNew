import { rtkQueryErrorLogger } from '@/services/errorHandling';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { reducers } from '@/slices';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import type { TypedUseSelectorHook } from 'react-redux';
import { authApi } from '@/services/auth';
import { citiesAndStatesApi } from '@/services/citiesAndStatesAndSexes';
import { dashboardApi } from '@/services/dashboard';
import { EducationalExperienceApi } from '@/services/educationalExperience';

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      citiesAndStatesApi.middleware,
      dashboardApi.middleware,
      EducationalExperienceApi.middleware,
      rtkQueryErrorLogger
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
