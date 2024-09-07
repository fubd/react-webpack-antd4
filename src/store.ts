import {proxy} from 'valtio';

export const store = proxy({menu: 0});

export const addMenu = () => {
  store.menu++;
};
