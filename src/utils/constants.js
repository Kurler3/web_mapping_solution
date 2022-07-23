// ENUM OF STEPS WHEN CLICKING IN MAP
export const CLICK_MAP_STEP = {
  start: "START",
  end: "END",
};

// DEFAULT EMPTY MAP SOURCE
export const EMPTY_MAP_SOURCE = {
  type: "FeatureCollection",
  features: [],
};

// APP ACTION TYPES
export const APP_ACTION_TYPES = {
  setKey: "SET_KEY",
  setMultiple: "SET_MULTIPLE",
  reset: "RESET_STATE",
  clickMap: "CLICK_MAP",
};

// TRANSPORT METHODS ENUM
export const TRANSPORT_METHODS = {
  // CAR
  Car: {
    id: "car",
    icon: "drive_eta",
    routeLinePaint: {
      "line-color": "#5190f5",
      "line-width": 8,
    },
    totalTimeKey: 'Total_TravelTime',
  },
  // FOOT
  Foot: {
    id: "foot",
    icon: "directions_walk",
    routeLinePaint: {
      "line-color": "transparent",
      "line-width": 2,
      "line-dasharray": [0.1],
    },
    totalTimeKey: 'Total_WalkTime',
  },
  // SUBWAY
  Bus: {
    id: "bus",
    icon: "directions_bus",
    routeLinePaint: {
      "line-color": "#f2b227",
      "line-width": 8,
    },
    totalTimeKey: 'Total_TruckTravelTime',
  },
};

// TRAVEL MODE JSONS

export const TRAVEL_MODE_JSONS = {
  // FOOT
  foot: {"attributeParameterValues":[{"attributeName":"Avoid Private Roads","parameterName":"Restriction Usage","value":"AVOID_MEDIUM"},{"attributeName":"Walking","parameterName":"Restriction Usage","value":"PROHIBITED"},{"attributeName":"Preferred for Pedestrians","parameterName":"Restriction Usage","value":"PREFER_LOW"},{"attributeName":"WalkTime","parameterName":"Walking Speed (km/h)","value":5},{"attributeName":"Avoid Roads Unsuitable for Pedestrians","parameterName":"Restriction Usage","value":"AVOID_HIGH"}],"description":"Follows paths and roads that allow pedestrian traffic and finds solutions that optimize travel time. The walking speed is set to 5 kilometers per hour.","distanceAttributeName":"Kilometers","id":"caFAgoThrvUpkFBW","impedanceAttributeName":"WalkTime","name":"Walking Time","restrictionAttributeNames":["Avoid Private Roads","Avoid Roads Unsuitable for Pedestrians","Preferred for Pedestrians","Walking"],"simplificationTolerance":2,"simplificationToleranceUnits":"esriMeters","timeAttributeName":"WalkTime","type":"WALK","useHierarchy":false,"uturnAtJunctions":"esriNFSBAllowBacktrack"},

  // DRIVING
  car: {"attributeParameterValues":[{"attributeName":"Avoid Unpaved Roads","parameterName":"Restriction Usage","value":"AVOID_HIGH"},{"attributeName":"Avoid Private Roads","parameterName":"Restriction Usage","value":"AVOID_MEDIUM"},{"attributeName":"Driving an Automobile","parameterName":"Restriction Usage","value":"PROHIBITED"},{"attributeName":"Through Traffic Prohibited","parameterName":"Restriction Usage","value":"AVOID_HIGH"},{"attributeName":"TravelTime","parameterName":"Vehicle Maximum Speed (km/h)","value":0},{"attributeName":"Roads Under Construction Prohibited","parameterName":"Restriction Usage","value":"PROHIBITED"},{"attributeName":"Avoid Gates","parameterName":"Restriction Usage","value":"AVOID_MEDIUM"},{"attributeName":"Avoid Express Lanes","parameterName":"Restriction Usage","value":"PROHIBITED"},{"attributeName":"Avoid Carpool Roads","parameterName":"Restriction Usage","value":"PROHIBITED"}],"description":"Models the movement of cars and other similar small automobiles, such as pickup trucks, and finds solutions that optimize travel time. Travel obeys one-way roads, avoids illegal turns, and follows other rules that are specific to cars. When you specify a start time, dynamic travel speeds based on traffic are used where it is available.","distanceAttributeName":"Kilometers","id":"FEgifRtFndKNcJMJ","impedanceAttributeName":"TravelTime","name":"Driving Time","restrictionAttributeNames":["Avoid Unpaved Roads","Avoid Private Roads","Driving an Automobile","Through Traffic Prohibited","Roads Under Construction Prohibited","Avoid Gates","Avoid Express Lanes","Avoid Carpool Roads"],"simplificationTolerance":10,"simplificationToleranceUnits":"esriMeters","timeAttributeName":"TravelTime","type":"AUTOMOBILE","useHierarchy":true,"uturnAtJunctions":"esriNFSBAtDeadEndsAndIntersections"},

  //  SUBWAY
  bus: {
    "attributeParameterValues": [
    {
    "attributeName": "Use Preferred Truck Routes",
    "parameterName": "Restriction Usage",
    "value": "PREFER_HIGH"
    },
    {
    "attributeName": "Avoid Unpaved Roads",
    "parameterName": "Restriction Usage",
    "value": "AVOID_HIGH"
    },
    {
    "attributeName": "Avoid Private Roads",
    "parameterName": "Restriction Usage",
    "value": "AVOID_MEDIUM"
    },
    {
    "attributeName": "Driving a Truck",
    "parameterName": "Restriction Usage",
    "value": "PROHIBITED"
    },
    {
    "attributeName": "Roads Under Construction Prohibited",
    "parameterName": "Restriction Usage",
    "value": "PROHIBITED"
    },
    {
    "attributeName": "Avoid Gates",
    "parameterName": "Restriction Usage",
    "value": "AVOID_MEDIUM"
    },
    {
    "attributeName": "Avoid Express Lanes",
    "parameterName": "Restriction Usage",
    "value": "PROHIBITED"
    },
    {
    "attributeName": "Avoid Carpool Roads",
    "parameterName": "Restriction Usage",
    "value": "PROHIBITED"
    },
    {
    "attributeName": "Avoid Truck Restricted Roads",
    "parameterName": "Restriction Usage",
    "value": "AVOID_HIGH"
    },
    {
    "attributeName": "TruckTravelTime",
    "parameterName": "Vehicle Maximum Speed (km/h)",
    "value": 0
    }
    ],
    "description": "Models basic truck travel by preferring designated truck routes, and finds solutions that optimize travel time. Routes must obey one-way roads, avoid illegal turns, and so on. When you specify a start time, dynamic travel speeds based on traffic are used where it is available, up to the legal truck speed limit.",
    "distanceAttributeName": "Kilometers",
    "id": "ZzzRtYcPLjXFBKwr",
    "impedanceAttributeName": "TruckTravelTime",
    "name": "Trucking Time",
    "restrictionAttributeNames": [
    "Avoid Carpool Roads",
    "Avoid Express Lanes",
    "Avoid Gates",
    "Avoid Private Roads",
    "Avoid Truck Restricted Roads",
    "Avoid Unpaved Roads",
    "Driving a Truck",
    "Roads Under Construction Prohibited",
    "Use Preferred Truck Routes"
    ],
    "simplificationTolerance": 10,
    "simplificationToleranceUnits": "esriMeters",
    "timeAttributeName": "TruckTravelTime",
    "type": "TRUCK",
    "useHierarchy": true,
    "uturnAtJunctions": "esriNFSBNoBacktrack"
    },
};
