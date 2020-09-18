import {createSlice} from '@reduxjs/toolkit';

export const DemoSlice = createSlice({
  name: 'name',
  initialState: {
    value: 'This is default name',
  },
  reducers: {
    toUpper: state => {
      state.value = state.value.toUpperCase();
    },
    toLower: state => {
      state.value = state.value.toLowerCase();
    },
    reverse: state => {
      state.value = state.value.split('')
                         .reverse()
                         .reduce((a, b) => a ? (a + b) : '');
    },
    delayedMess: (state, action) => {
      setTimeout(() => {
        state.value = state.value.split('').join('_');
      }, action.payload || 2000);
    },
  },
});
export const {toUpper, toLower, reverse, delayedMess} = DemoSlice.actions;
export const myName = state => state.name.value;
export default DemoSlice.reducer;
