export default class Table {
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  init(json) {
    this.container.innerHTML = `
        <table class="table">
        <thead><tr>
        <th class='thead id arrow'>id</th>
        <th class='thead title'>title</th>
        <th class='thead year'>yaer</th>
        <th class='thead imdb'>imdb</th>
      </tr></thead>
          <tbody>
          </tbody>
        </table>`;

    const reDrawThead = () => {
      for (let i = 0; i < this.theadRow.children.length; i += 1) {
        this.theadRow.children[i].textContent = this.theadRow.children[i].textContent.replace('⬇️', '');
      }
    };

    this.tbody = this.container.querySelector('tbody');
    this.theadRow = this.container.querySelector('thead tr');

    this.data = JSON.parse(json);
    this.tbody.append(...this.getSort());

    this.container.querySelector('.id').addEventListener('click', () => {
      this.tbody.replaceChildren();
      reDrawThead();
      this.tbody.append(...this.getSort('id'));
      this.container.querySelector('.id').textContent += '⬇️';
    });

    this.container.querySelector('.title').addEventListener('click', () => {
      this.tbody.replaceChildren();
      reDrawThead();
      this.tbody.append(...this.getSort('title'));
      this.container.querySelector('.title').textContent += '⬇️';
    });

    this.container.querySelector('.year').addEventListener('click', () => {
      this.tbody.replaceChildren();
      reDrawThead();
      this.tbody.append(...this.getSort('year'));
      this.container.querySelector('.year').textContent += '⬇️';
    });

    this.container.querySelector('.imdb').addEventListener('click', () => {
      this.tbody.replaceChildren();
      reDrawThead();
      this.tbody.append(...this.getSort('imdb'));
      this.container.querySelector('.imdb').textContent += '⬇️';
    });
  }

  getSort(filter) {
    let trArr = [];

    this.data.forEach((i) => {
      const tr = document.createElement('tr');

      const id = document.createElement('td');
      const title = document.createElement('td');
      const year = document.createElement('td');
      const imdb = document.createElement('td');

      tr.dataset.id = i.id;
      tr.dataset.title = i.title;
      tr.dataset.year = i.year;
      tr.dataset.imdb = i.imdb.toFixed(2);

      id.textContent = tr.dataset.id;
      title.textContent = tr.dataset.title;
      year.textContent = `(${tr.dataset.year})`;
      imdb.textContent = `imdb:${tr.dataset.imdb}`;

      tr.append(id, title, year, imdb);
      trArr.push(tr);
    });

    const filterHandler = (Arr) => {
      if (filter === 'id') {
        return Arr.sort((a, b) => a.dataset.id - b.dataset.id);
      } if (filter === 'year') {
        return Arr.sort((a, b) => a.dataset.year - b.dataset.year);
      } if (filter === 'imdb') {
        return Arr.sort((a, b) => a.dataset.imdb - b.dataset.imdb);
      } if (filter === 'title') {
        return Arr.sort();
      }
      return Arr;
    };
    trArr = filterHandler(trArr, filter);
    return trArr;
  }
}
