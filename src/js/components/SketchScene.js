import {Animation, Entity, Scene} from 'aframe-react';
import Key from 'mousetrap';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Camera from './Camera';
import Cursor from './Cursor';
import Light from './Light';
import Renderer from './Renderer';
import Sky from './Sky';
import {backspace, characterEnter, newLine} from '../actions/editor';

class SketchScene extends React.Component {
  constructor(props) {
    super(props);

    'abcdefghijklmnopqrstuvwxyz<>"=-/:'.split('').forEach(character => {
      Key.bind(character, event => {
        props.characterEnter(event.key);
      });
    });

    Key.bind('space', event => { props.characterEnter(' '); });
    Key.bind('backspace', event => { props.backspace(); });
    Key.bind('enter', event => { props.newLine(); });
  }

  render () {
    return (
      <Scene>
        <Camera></Camera>

        <Sky/>
        <Renderer program={this.props.program}/>

        {this.props.program.map((line, i) =>
          <Entity text={{curveSegments: 1, bevelThickness: 1, size: 0.25, text: line}}
                  material={{color: 'red', shader: 'flat'}}
                  position={`0 ${-0.25 * i} -10`}>
          </Entity>
        )}
      </Scene>
    );
  }
}

export default connect(
  state => ({
    line: state.editor.line,
    program: state.editor.program
  }),
  dispatch => bindActionCreators({
    backspace,
    characterEnter,
    newLine
  }, dispatch)
)(SketchScene);
