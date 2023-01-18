import Table from './Table';
import { json } from './json';

document.addEventListener('DOMContentLoaded', () => {
  const table = new Table();
  table.bindToDOM(document.querySelector('#container'));
  table.init(json);
});
