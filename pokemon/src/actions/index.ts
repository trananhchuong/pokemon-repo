import { SET_MENU_DATA } from "./aciton";


export const SetDataMenu = (dataMenu: any) => {
    return {
        type: SET_MENU_DATA,
        payload: dataMenu
    };
};

