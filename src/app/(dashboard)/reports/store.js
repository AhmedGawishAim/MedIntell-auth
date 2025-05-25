import { createSlice } from "@reduxjs/toolkit";


export const ReportSlice = createSlice({
  name: "reports",
  initialState: {
    openReportModal: false,
    openDocumentModal: false,
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openReportModal = action.payload;
    },
    toggleAddDocumentModal: (state, action) => {
      state.openDocumentModal = action.payload;
    },
  },
});

export const {
  toggleAddModal,
  toggleAddDocumentModal,
} = ReportSlice.actions;
export default ReportSlice.reducer;
