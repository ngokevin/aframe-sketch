import _ from 'lodash';
import * as editorActions from '../actions/editor';

const initialState = {
  line: 0,
  program: [
    ''  // Line 1.
  ]
};

export default function editorReducer(state=initialState, action) {
  switch (action.type) {
    case editorActions.BACKSPACE: {
      const newState = _.cloneDeep(state);
      newState.program[newState.line] = newState.program[newState.line].slice(0, -1);
      return newState;
    }

    case editorActions.CHARACTER_ENTER: {
      const newState = _.cloneDeep(state);
      newState.program[newState.line] = newState.program[newState.line] + action.payload
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
