import { combineReducers } from 'redux';
import auth from '../features/authSlice';
import inventory from '../features/inventorySlice';
import report from '../features/reportSlice';

export const rootReducer = combineReducers({ auth, inventory, report });
