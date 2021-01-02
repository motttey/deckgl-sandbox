import React, {useState, useCallback} from "react";
import DeckGL from "deck.gl";
import { StaticMap } from 'react-map-gl';
import { LightingEffect, AmbientLight, PointLight, LinearInterpolator } from '@deck.gl/core';
import { PolygonLayer } from '@deck.gl/layers';

const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json', // eslint-disable-line
  TRIPS: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json' // eslint-disable-line
};

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000]
});

const lightingEffect = new LightingEffect({ambientLight, pointLight});

const landCover = [[[-74.0, 40.7], [-74.02, 40.7], [-74.02, 40.75], [-74.0, 40.75]]];

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibW90dHRleSIsImEiOiJja2o3M29ndGgzODhoMnhtMGRzdDIzZHR1In0.M0dUGIlz6Tp6Rx4a1qsNJQ";
const mapStyle = "mapbox://styles/motttey/ckjfbccd71ea519qxze45w2j8";

const INITIAL_VIEW_STATE = {
  longitude: -74.01,
  latitude: 40.71,
  zoom: 15,
  pitch: 45,
  bearing: 0,
  maxZoom: 16,
  minZoom: 4,
};

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70]
};

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect]
};

const transitionInterpolator = new LinearInterpolator(['bearing']);

export default function App({
  buildings = DATA_URL.BUILDINGS,
  theme = DEFAULT_THEME,
  loopLength = 1800, // unit corresponds to the timestamp in source data
  animationSpeed = 1
})
{
  const [initialViewState, setInitialViewState] = useState(INITIAL_VIEW_STATE);

  const rotateCamera = useCallback(() => {
    setInitialViewState(viewState => ({
      ...viewState,
      bearing: viewState.bearing + 10,
      transitionDuration: 1000,
      transitionInterpolator,
      onTransitionEnd: rotateCamera
    }))
  }, []);

  const layers = [
   new PolygonLayer({
     id: 'ground',
     data: landCover,
     getPolygon: f => f,
     stroked: false,
     getFillColor: [0, 0, 0, 0]
   }),
   new PolygonLayer({
     id: 'buildings',
     data: buildings,
     extruded: true,
     wireframe: false,
     opacity: 0.5,
     getPolygon: f => f.polygon,
     getElevation: f => f.height,
     getFillColor: DEFAULT_THEME.buildingColor,
     material: DEFAULT_THEME.material
   })
 ];

  return (
    <div>
      <DeckGL
        layers={layers}
        initialViewState={initialViewState}
        onLoad={rotateCamera}
        effects={theme.effects}
        controller={true}
      >
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          preventStyleDiffing={true}
        />
      </DeckGL>
    </div >
  );
}
