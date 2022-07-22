// ENUM OF STEPS WHEN CLICKING IN MAP
export const CLICK_MAP_STEP = {
    start: 'START',
    end: 'END',
};

// DEFAULT EMPTY MAP SOURCE
export const EMPTY_MAP_SOURCE = {
    type: "FeatureCollection",
    features: [],
}

// APP ACTION TYPES
export const APP_ACTION_TYPES = {
    setKey: "SET_KEY",
    setMultiple: "SET_MULTIPLE",
    reset: "RESET_STATE",
    clickMap: "CLICK_MAP",
}


// TRANSPORT METHODS ENUM
export const TRANSPORT_METHODS = {
    // CAR
    Car: {
        id: 'car',
        icon: 'drive_eta',
        routeLinePaint: {
            "line-color": "#5190f5",
            "line-width": 8,
        },
    },
    // FOOT
    Foot: {
        id: 'foot',
        icon: 'directions_walk',
        routeLinePaint: {
            "line-color": "transparent",
            "line-width": 2,
            "line-dasharray": [0.1],
        },
    },
    // SUBWAY
    Subway: {
        id: "subway",
        icon: 'directions_subway',
        routeLinePaint: {
            "line-color": "#f2b227",
            "line-width": 8,
        }
    }
};
