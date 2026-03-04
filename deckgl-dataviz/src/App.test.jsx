import {render} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

// deck.gl / mapbox-gl require WebGL APIs that are not available in jsdom.
// For unit tests we do a simple smoke mount with these modules mocked.
vi.mock('deck.gl', () => ({
  default: () => null
}));
vi.mock('react-map-gl', () => ({
  StaticMap: () => null
}));
vi.mock('@deck.gl/core', () => ({
  LightingEffect: class {},
  AmbientLight: class {},
  PointLight: class {},
  LinearInterpolator: class {}
}));
vi.mock('@deck.gl/layers', () => ({
  ScatterplotLayer: class {}
}));
vi.mock('@deck.gl/aggregation-layers', () => ({
  HexagonLayer: class {}
}));
vi.mock('@deck.gl/geo-layers', () => ({
  Tile3DLayer: class {}
}));
vi.mock('@loaders.gl/3d-tiles', () => ({
  Tiles3DLoader: {}
}));
vi.mock('math.gl', () => ({
  Vector3: class {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
}));

import App from './App';

describe('App', () => {
  it('mounts without crashing', () => {
    const {container} = render(<App />);
    expect(container).toBeTruthy();
  });
});
