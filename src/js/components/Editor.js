import {Entity} from 'aframe-react';
import React from 'react';

export default props => {
  return (
    <Entity id="editor" position="-5 0 -2">

      <Entity id="editor-bg" geometry="primitive: plane; height: 5; width: 15"
              material="color: #FFFBE0; opacity: 0.5; shader: flat" position="7 -1.5 0"/>

      <Entity id="editor-text">
        {props.program.map((line, i) =>
          <Entity className="editor-line"
                  look-at="[camera]"
                  material={{color: '#474744', shader: 'flat'}}
                  position={`0 ${-0.25 * i} 0`}
                  text={{curveSegments: 1, bevelSize: .05, bevelThickness: 0.01, size: 0.25,
                         text: line}}>
          </Entity>
        )}
      </Entity>
    </Entity>
  );
};
