import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
  },
  reducers: {
    setStudentProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

export const { setStudentProfiles } = profileSlice.actions;
export default profileSlice.reducer;
