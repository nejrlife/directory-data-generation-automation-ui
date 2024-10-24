// rootReducer.ts
import { combineReducers } from 'redux';
import appReducer from './reducers';

const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // For TypeScript type inference

export default rootReducer;