import { INITIAL_ID } from '../constants';

let currentUUID = INITIAL_ID;

export const uuid = () => currentUUID++;
