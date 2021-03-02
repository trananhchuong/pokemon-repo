import { combineReducers } from 'redux';
import dataPokemonReducer from './dataPokemonReducer';


const rootReducer = combineReducers({
    dataPokemon: dataPokemonReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
