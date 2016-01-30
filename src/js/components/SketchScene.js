import {Animation, Entity, Scene} from 'aframe-react';
import Key from 'mousetrap';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Editor from './Editor';
import Renderer from './Renderer';
import {backspace, characterEnter, cursorLeft, cursorRight, newLine} from '../actions/editor';

class SketchScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditor: true
    };

    const charWhitelist = 'abcdefghijklmnopqrstuvwxyz<>"=-/:;0123456789'.split('');
    charWhitelist.forEach((character, i) => {
      Key.bind(character, event => {
        event.preventDefault();
        event.stopPropagation();
        props.characterEnter(charWhitelist[i]);
      });
    });

    Key.bind('backspace', event => {
      event.preventDefault();
      event.stopPropagation();
      props.backspace();
    });

    Key.bind(['ctrl+z', 'command+z'], event => {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        showEditor: !this.state.showEditor
      });
    });


    Key.bind('enter', () => { props.newLine(); });

    Key.bind('left', () => { props.cursorLeft(); });

    Key.bind('right', () => { props.cursorRight(); });

    Key.bind('space', () => { props.characterEnter(' '); });

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
        {this.state.showEditor && <Editor cursor={this.props.cursor}
                                          program={this.props.program}/>}
      </Scene>
    );
  }
}

export default connect(
  state => ({...state.editor}),
  dispatch => bindActionCreators({
    backspace,
    characterEnter,
    cursorLeft,
    cursorRight,
    newLine
  }, dispatch)
)(SketchScene);
