import { configureStore } from "@reduxjs/toolkit";
import {useSelector ,useDispatch} from 'react-redux';
import parentReducer from "./parentRedux";


const store = configureStore({
    reducer: parentReducer,
    middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;


export default store;