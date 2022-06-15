import { combineReducers } from "@reduxjs/toolkit";
import { web3Reducer } from "./Slices/web3ContractSlices";

const parentReducer = combineReducers({
    web3Connect : web3Reducer
})

export default parentReducer;