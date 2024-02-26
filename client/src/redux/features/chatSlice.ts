import { createSlice } from '@reduxjs/toolkit';
interface InitialState {
  value: {
    selectedChat: any;
    chatLog: any;
  };
}

const initialState = {
  value: {
    selectedChat: '',
    chatLog: [],
  },
} as InitialState;

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.value.selectedChat = action.payload;
    },
    pushMessageToChatLog: (state, action) => {
      state.value.chatLog.push(action.payload);
    },
    setChatLog: (state, action) => {
      const { chatLog } = action.payload;
      state.value.chatLog = chatLog;
    },
  },
});

export const { setSelectedChat, pushMessageToChatLog, setChatLog } =
  chatSlice.actions;
export default chatSlice.reducer;
