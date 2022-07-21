import { APP_ACTION_TYPES, CLICK_MAP_STEP } from '../utils/constants';


// DEFINE THE INITIAL STATE
export const initialState = {
    loading: false,
    startCords: null,
    endCords: null,
    zoom: 13,
    currentStep: CLICK_MAP_STEP.start,
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
        default:
            return state;
    }

}