import {createAction} from 'redux-actions';

export const BACKSPACE = 'BACKSPACE';
export const backspace = createAction(BACKSPACE);

export const CHARACTER_ENTER = 'CHARACTER_ENTER';
export const characterEnter = createAction(CHARACTER_ENTER);

export const NEW_LINE = 'NEW_LINE';
export const newLine = createAction(NEW_LINE);
