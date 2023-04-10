import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  email: string;
  token: string;
  isAuth: boolean;
}

const initialState: User = {
  email: '',
  token: '',
  isAuth: false
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
    }
  }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;