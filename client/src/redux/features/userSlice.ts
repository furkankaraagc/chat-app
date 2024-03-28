import { FriendList } from '@/types/chatTypes';
import { UserInfo } from '@/types/userTypes';
import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  value: {
    friendList: FriendList[];
    userInfo: UserInfo;
  };
}

const initialState = {
  value: {
    friendList: [],
    userInfo: {
      userid: '',
      username: '',
    },
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
