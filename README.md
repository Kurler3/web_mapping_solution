# Huawei Challenge Web Mapping Solution


## Usage

### Intro

When entering starting the app, 2 buttons and a map is displayed. To **search for a path**, the user can either click in the map directly, or he can click in the top-left button to open up the **controls container**.
If the user clicks in the map while the controls container is closed, it will open automatically. 

The logic for selecting the source (starting) and destination (ending) points is: 
    - First time clicking in map sets the **starting point**.
    - Second time clicking in map sets the **ending point**.

### Calculating the route

After having both **starting** and **ending** points selected, the user can then click on the button that says **Calculate Route** to get the best route path for the transport method chosen with the icons above.

At any time, the user can reset the **starting** or **ending** points by clicking in the respective box in the controls container.

### Highlighting steps

After having the route calculated, the user will get a list of steps for that route. Each of these steps (excluding the first and the last) can be highlighed by clicking on them. When a step is highlighted, the map zooms in/out and flys to where that piece of the path is.

### Using the mock routing response

There's one button on the top-right side of the screen that uses the coordinates given in the response.json file to calculate a route.

## Tools used

 - [Maplibre](https://maplibre.org/) Map library.
 - [ArcGis](https://www.arcgis.com/) Cloud-based mapping solution (I used the routing services).
 - [React](https://reactjs.org/) Javascript framework.

## Instalation

When running this app from your local, please run **npm install** first, since I am using some libraries from ArcGis and also React.js.