import { combinedReducers } from 'redux';

import userReducer from './user/user.reducer';

const rootReducer = combinedReducers({
    user: userReducer
});

export default rootReducer;