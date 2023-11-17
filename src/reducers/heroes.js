import { createReducer } from "@reduxjs/toolkit";


import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// ****** С помощью createReducer НО РАБОТАТЬ БУДЕТ ТОЛЬКО В НАТИВНОМ JS *********************************** 
// ****** C TypeScript работать НЕ БУДЕТ! *********************************** 

// const heroes = createReducer(initialState, {
//     [heroesFetching]: state => {state.heroesLoadingStatus = 'loading'},
//     [heroesFetched]:  (state, action) => {state.heroesLoadingStatus = 'idle'; state.heroes = action.payload},
//     [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
//     [heroCreated]: (state , action) => {state.heroes.push(action.payload)},
//     [heroDeleted]: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)}
// }, [], state => state 
// )

// ****** С помощью createReducer ***********************************

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state , action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {});
})


// ****** В классическом стиле ***********************************

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 // // ЭТО МОЖНО СДЕЛАТЬ И ПО ДРУГОМУ
//                 // // Я специально показываю вариант с действиями тут, но более правильный вариант
//                 // // будет показан в следующем уроке
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //                 action.payload : 
//                 //                 action.payload.filter(item => item.element === state.activeFilter),
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
        
//         case 'HERO_CREATED':
//             // Формируем новый массив    
            
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//                 // Фильтруем новые данные по фильтру, который сейчас применяется
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //                 newCreatedHeroList : 
//                 //                 newCreatedHeroList.filter(item => item.element === state.activeFilter)
//             }
//         case 'HERO_DELETED': 
//             // Формируем новый массив
//             // const newHeroList = state.heroes.filter(item => item.id !== action.payload);
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//                 // Фильтруем новые данные по фильтру, который сейчас применяется
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //                 newHeroList : 
//                 //                 newHeroList.filter(item => item.element === state.activeFilter)
//             }
//         default: return state
//     }
// }

export default heroes;