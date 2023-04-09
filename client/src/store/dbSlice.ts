import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Item {
  id: string;
  text: string;
}

interface ListItems {
  list: Item[] | null;
}

const initialState: ListItems = {
  list: null
}


const dbSlice = createSlice({
  name: 'db',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<Item[] | null>) {
      state.list = action.payload;
    }
  }
})

export const { setList } = dbSlice.actions;
export default dbSlice.reducer;