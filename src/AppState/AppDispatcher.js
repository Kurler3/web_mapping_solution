import { APP_ACTION_TYPES, CLICK_MAP_STEP, TRANSPORT_METHODS } from '../utils/constants';


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
    transportChosen: TRANSPORT_METHODS.Car.id,
    // CALCULATED ROUTE
    calculatedRoute: null,
    // HIGHLIGHTED STEP
    highlightedStep: null,
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
        case APP_ACTION_TYPES.clickMap:

            // step: CLICK_MAP_STEP.start/end
            // cords: [long, lat]
            // 
            //

            return {
                ...state,
                currentStep: action.step,
                endCords: action.step === CLICK_MAP_STEP.end ? null : action.cords,
                startCords: action.step === CLICK_MAP_STEP.end ? action.cords : state.startCords,
                isChoosing: true,
                calculatedRoute: null,
            }
        case APP_ACTION_TYPES.reset:
            return initialState;
        default:
            return state;
    }

}