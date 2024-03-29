import React, {useState, useCallback} from "react";
import DeckGL from "deck.gl";
import { StaticMap } from 'react-map-gl';
import { LightingEffect, AmbientLight, PointLight, LinearInterpolator } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HexagonLayer } from '@deck.gl/aggregation-layers';

import { Vector3 } from 'math.gl';

import { Tile3DLayer } from '@deck.gl/geo-layers';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';

// Tokyo Bigsight
const targetPoint = {
  name: "国際展示場",
  size: 10,
  coordinates: [139.7940582, 35.6297442]
}

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

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibW90dHRleSIsImEiOiJja2o3M29ndGgzODhoMnhtMGRzdDIzZHR1In0.M0dUGIlz6Tp6Rx4a1qsNJQ";
const mapStyle = "mapbox://styles/motttey/ckjfbccd71ea519qxze45w2j8";

const INITIAL_VIEW_STATE = {
  longitude: targetPoint.coordinates[0],
  latitude: targetPoint.coordinates[1],
  zoom: 50,
  pitch: 65,
  bearing: 0,
  maxZoom: 16,
  minZoom: 4,
};

const material = {
  ambient: 0.3,
  diffuse: 0.5,
  shininess: 32,
  specularColor: [195, 100, 100]
};

const DEFAULT_THEME = {
  buildingColor: [51, 51, 51],
  lineColor: [0, 250, 154],
  material,
  effects: [lightingEffect]
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const transitionInterpolator = new LinearInterpolator(['bearing']);

export default function App({
  // buildings = DATA_URL.BUILDINGS,
  theme = DEFAULT_THEME,
  // loopLength = 1800, // unit corresponds to the timestamp in source data
  // animationSpeed = 1
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
    new Tile3DLayer({
      id: 'tile3dlayer',
      pointSize: 0.5,
      data: 'https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13108_koto-ku/texture/tileset.json',
      loader: Tiles3DLoader,
      loadOptions: {
        tileset: {
          throttleRequests: false,
        }
      },
      onTileLoad: (tileHeader) => {
        tileHeader.content.cartographicOrigin = new Vector3(
            tileHeader.content.cartographicOrigin.x,
            tileHeader.content.cartographicOrigin.y,
            tileHeader.content.cartographicOrigin.z - 40,
        );
      }
    }),
    new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: [ targetPoint ],
      pickable: true,
      opacity: 1,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: d => d.coordinates,
      getRadius: d => Math.sqrt(d.size),
      getFillColor: () => [255, 140, 0],
      getLineColor: () => DEFAULT_THEME.lineColor
    }),
    new HexagonLayer({
      id: 'hexagon-layer',
      colorRange,
      data: [ targetPoint ],
      elevationRange: [0, 10],
      radius: 250,
      coverage: 1,
      opacity: 0.5,
      elevationScale: 1,
      upperPercentile: 100,
      getElevationWeight: () => 0,
      elevationAggregation: 'SUM',
      getColorValue: () => 1,
      getPosition: (d) => d.coordinates
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
        style={{zIndex: -1}}
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
