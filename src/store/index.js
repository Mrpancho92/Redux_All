// import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore/* , getDefaultMiddleware */ } from '@reduxjs/toolkit';
// import reducer from '../reducers';
// import ReduxThunk from 'redux-thunk';
// import heroes from '../reducers/heroes';
// import heroes from '../components/heroesList/heroesSlice';
// import filters from '../reducers/filters';
import filters from '../components/heroesFilters/filtersSlice';
import {apiSlice} from '../api/apiSlice';

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

// const enhancer = (createStore) => (...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type: action
//             })
//         }
//         return oldDispatch(action)
//     }
//     return store;
// }

// const store = createStore( 
//                     combineReducers({heroes, filters}),
//                     compose(applyMiddleware(ReduxThunk, stringMiddleware),
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                     )
                    // compose(
                    //     enhancer,
                    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                    // )
                    //  );
const store = configureStore({
    reducer: {/* heroes, */ 
                filters,
                [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware), 
    // middleware: [ReduxThunk, stringMiddleware], 
    devTools: process.env.NODE_ENV !== 'production'
   
})

export default store;
