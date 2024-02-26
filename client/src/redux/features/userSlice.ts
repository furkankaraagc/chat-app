import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  value: {
    friendList: string[];
    userInfo: any;
  };
}

const initialState = {
  value: {
    friendList: [],
    userInfo: '',
  },
} as InitialState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFriendList: (state, action) => {
      state.value.friendList = action.payload;
    },
    setUserInfo: (state, action) => {
      state.value.userInfo = action.payload;
    },
  },
});

export const { setFriendList, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
