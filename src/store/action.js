import { createSlice } from '@reduxjs/toolkit';

const actionSlice = createSlice({
  name: 'actions',
  initialState: {
    openDeleteModal: false,
    fun: null,
    params: null,
  },
  reducers: {
    toggleDeleteModal: (state, action) => {
      const { open, fun, params } = action.payload;
      state.openDeleteModal = open;
      state.fun = fun;
      state.params = params;
    },
  },
});

export const { toggleDeleteModal } = actionSlice.actions;
export default actionSlice.reducer;
