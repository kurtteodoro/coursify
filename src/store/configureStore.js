import { configureStore, combineReducers } from '@reduxjs/toolkit';
import post from './post';

const reducers = combineReducers({ post });
const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;