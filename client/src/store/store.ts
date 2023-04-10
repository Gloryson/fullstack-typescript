import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import dbSlice from './dbSlice';
import userSlice from './userSlice';





const store = configureStore({
  reducer: {
    db: dbSlice,
    user: userSlice,
  }
})





type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;