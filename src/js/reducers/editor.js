import {Entity} from 'aframe-react';
import _ from 'lodash';
import parse5 from 'parse5';
import React from 'react';

import * as editorActions from '../actions/editor';

const initialProgram = [
  '<a-entity geometry="primitive: sphere" material="color: blue"></a-entity>',
  '<a-entity geometry="primitive: box" material="color: red" position="2 0 0"></a-entity>'
];
const initialState = {
  cursor: {
    line: 0,
    column: initialProgram[0].length
  },
  line: 0,
  program: initialProgram,
  tree: parseProgram(initialProgram)
};

export default function editorReducer(state=initialState, action) {
  switch (action.type) {
    case editorActions.BACKSPACE: {
      const newState = _.cloneDeep(state);
      newState.program[newState.line] = newState.program[newState.line].slice(0, -1);
      newState.tree = parseProgram(newState.program);
      if (newState.cursor > 0) {
        newState.cursor.column -= 1;
      }
      return newState;
    }

    case editorActions.CHARACTER_ENTER: {
      const newState = _.cloneDeep(state);
      newState.program[newState.line] = newState.program[newState.line] + action.payload
      newState.tree = parseProgram(newState.program);
      newState.cursor.column += 1;
      return newState;
    }

    case editorActions.CURSOR_LEFT : {
      const newState = _.cloneDeep(state);
      if (newState.cursor.column > 0) {
        newState.cursor.column -= 1;
      }
      return newState;
    }

    case editorActions.CURSOR_RIGHT : {
      const newState = _.cloneDeep(state);
      if (newState.cursor.column < newState.program[newState.line].length) {
        newState.cursor.column += 1;
      }
      return newState;
    }

    case editorActions.NEW_LINE: {
      const newState = _.cloneDeep(state);
      newState.line = newState.line + 1;
      newState.program.push('');
      newState.cursor.column = 0;
      newState.cursorPosition.line += 1;
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
    return getDOMTree(doc.childNodes[0]).filter(node => node);
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
