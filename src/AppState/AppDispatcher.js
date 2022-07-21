import { APP_ACTION_TYPES, CLICK_MAP_STEP } from '../utils/constants';


// DEFINE THE INITIAL STATE
export const initialState = {
    // LOADING ROUTE OR NOT
    loading: false,
    // START COORDINATES
    startCords: null,
    // END COORDINATES
    endCords: null,
    // ZOOM
    zoom: 13,
    // CURRENT STEP WHEN CLICKING
    currentStep: CLICK_MAP_STEP.start,
    // IF IS CHOSING OR NOT
    isChosing: false,
    // WAY OF TRANSPORT CHOSEN
    transportChosen: null,
    // CALCULATED ROUTE
    calculatedRoute: null,
};

// EXPORT REDUCER
export default function appReducer(state=initialState, action) {

    switch(action.type) {
        case APP_ACTION_TYPES.setKey:

            // action: {
            //   key: 'keyname'
            //   value: new value
            // 
            return {
                ...state,
                [action.key]: action.value
            };
        case APP_ACTION_TYPES.setMultiple: 

            // action: {
            //  object: {
            //      key1: value1,
            //      key2: value2,
            //  }
            // }

            return {
                ...state,
                ...action.object,
            }
        case APP_ACTION_TYPES.reset:
            return initialState;
        default:
            return state;
    }

}