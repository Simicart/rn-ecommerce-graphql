import {configureStore} from '@reduxjs/toolkit';
import demoSliceReducer from './DemoSlice.js';

export default configureStore({
  reducer: {
    name: demoSliceReducer,
  },
});
