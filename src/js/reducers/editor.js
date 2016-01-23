import Entity from 'aframe-react';
import _ from 'lodash';
import parse5 from 'parse5';
import React from 'react';

import * as editorActions from '../actions/editor';

const initialState = {
  line: 0,
  program: [
    '<a-entity geometry="primitive: sphere" material="color: blue"></a-entity>'  // Line 1.
  ],
  tree: []
};

export default function editorReducer(state=initialState, action) {
  switch (action.type) {
    case editorActions.BACKSPACE: {
      const newState = _.cloneDeep(state);
      newState.program[newState.line] = newState.program[newState.line].slice(0, -1);
      newState.tree = parseProgram(newState.program);
      return newState;
    }

    case editorActions.CHARACTER_ENTER: {
      const newState = _.cloneDeep(state);
      newState.program[newState.line] = newState.program[newState.line] + action.payload
      newState.tree = parseProgram(newState.program);
      return newState;
    }

    case editorActions.NEW_LINE: {
      const newState = _.cloneDeep(state);
      newState.line = newState.line + 1;
      newState.program.push('');
      return newState;
    }

    default: {
      return state;
    }
  }
}

function parseProgram (program) {
  const doc = parse5.parse(program.join(''));

  if (doc.childNodes.length) {
    console.log(doc);
    console.log(getDOMTree(doc.childNodes[0]));
    return getDOMTree(doc.childNodes[0]);
  }

  function getDOMTree (node) {
    if (node.tagName === 'a-entity') {
      const components = {};
      node.attrs.forEach(attr => {
        components[attr.name] = attr.value;
      });
      return (
        <Entity {...components}/>
      );
    }

    if (!node.childNodes || !node.childNodes.length) {
      return;
    }

    return node.childNodes.map(childNode => getDOMTree(childNode));
  }
}
