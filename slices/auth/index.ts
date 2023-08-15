import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthSlice {
  token?: string;
  fallBackUrl?: string;
  phoneNumber?: number;
  fullName?: string;
  id?: number;
  imageUrl?: string;
  username?: string;
  password?: string;
}

const initialState: AuthSlice = {
  token: undefined,
  fallBackUrl: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<number>) => {
      state.phoneNumber = action.payload;
    },
    setAuthData: (state, action: PayloadAction<AuthSlice>) => {
      return action.payload;
    },
    clearAuth: () => {
      return initialState;
    },
    setFallBackUrl: (state, action: PayloadAction<string>) => {
      state.fallBackUrl = action.payload;
    },
    setUserIDForVerify: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const {
  setAuthData,
  clearAuth,
  setFallBackUrl,
  setPhoneNumber,
  setUserIDForVerify,
} = authSlice.actions;

export default authSlice.reducer;
