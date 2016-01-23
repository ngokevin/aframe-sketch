import {Animation, Entity, Scene} from 'aframe-react';
import Key from 'mousetrap';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Editor from './Editor';
import Renderer from './Renderer';
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
        <Entity position="0 0 5">
          <Entity camera look-controls/>
        </Entity>

        <Entity id="sky" geometry={{primitive: 'sphere', radius: 5000}}
                material={{color: '#2994B2', shader: 'flat'}} scale="1 1 -1"/>

        <Renderer tree={this.props.tree}/>
        <Editor program={this.props.program}/>
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
