import _ from 'lodash';
import { GET_MENU_DATA, SET_MENU_DATA } from "../actions/aciton";

const initialState = {
    gameVersion: [],
    generations: []
};

const dataPokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MENU_DATA: {
            return state;
        }

        case SET_MENU_DATA: {
            const gameVersion = _.get(action, 'payload.gameVersion', []);
            const generations = _.get(action, 'payload.generations', []);

            const dataNew = {
                ...state,
                gameVersion,
                generations
            };
            return dataNew;
        }

        default:
            return state;
    }
};

export default dataPokemonReducer;
