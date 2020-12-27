import React from "react";
import DeckGL from "deck.gl";
import { StaticMap } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoibW90dHRleSIsImEiOiJja2o3M29ndGgzODhoMnhtMGRzdDIzZHR1In0.M0dUGIlz6Tp6Rx4a1qsNJQ";
const mapStyle = "mapbox://styles/motttey/ckj73t4dg4wne19p2yfxv81uf";
const INITIAL_VIEW_STATE = {
  longitude: 12.8333,
  latitude: 42.8333,
  zoom: 4,
  maxZoom: 16,
  minZoom: 4,
  pitch: 60,
  bearing: 5
};
export default class App extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    // will be used to fetch data from the api later
  }
  render() {
    return (
      <div>
        }
        <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} >
          <StaticMap mapStyle={mapStyle} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      </div >
    );
  }
}
