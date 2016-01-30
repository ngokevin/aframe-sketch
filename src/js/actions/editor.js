import {createAction} from 'redux-actions';

export const BACKSPACE = 'BACKSPACE';
export const backspace = createAction(BACKSPACE);

export const CHARACTER_ENTER = 'CHARACTER_ENTER';
export const characterEnter = createAction(CHARACTER_ENTER);

export const CURSOR_LEFT = 'CURSOR_LEFT';
export const cursorLeft = createAction(CURSOR_LEFT);

export const CURSOR_RIGHT = 'CURSOR_RIGHT';
export const cursorRight = createAction(CURSOR_RIGHT);

export const NEW_LINE = 'NEW_LINE';
export const newLine = createAction(NEW_LINE);
