import {Entity} from 'aframe-react';
import React from 'react';

export default props => (
  <Entity position="0 0 -5">
    {props.tree}
  </Entity>
);
