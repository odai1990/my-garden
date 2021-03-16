'use strict';

const Flowers = function (cat, path) {
  this.cat = cat;
  this.path = path;
  Flowers.all.push(this);
};

Flowers.all = [];


function generate() {
  new Flowers('Alstroemerias', './assests/img/alstroemerias.jpeg');
  new Flowers('Gardenias', './assests/img/gardenias.jpeg');
  new Flowers('Orchids', './assests/img/orchids.jpeg');
  new Flowers('Roses', './assests/img/peonies.jpeg');
  new Flowers('Sunflowers', './assests/img/sunflowers.jpeg');
  new Flowers('Tulips', './assests/img/tulips.jpeg');
  new Flowers('Peonies', './assests/img/peonies.jpeg');
}

generate();


const OneFlower = function (flower, name, season) {
  this.flower = flower;
  this.name = name;
  this.season = season;
  OneFlower.all.push(this);
};

OneFlower.all = [];



OneFlower.prototype.addProduct = function () {
  localStorage.setItem('Flowers', JSON.stringify(OneFlower.all));
};


const handelAdd = function (event) {
  event.preventDefault();
  let oneFlower = new OneFlower(Flowers.all[event.target.cat.value], event.target.cat.value, event.target.seaion.value);
  oneFlower.addProduct();
  renderToHtml();
};
const handelDeleteOne = function (event) {

  if(event.target.matches('.deleteOnne'))
  {
 
  OneFlower.all.splice(event.target.id,1);
  localStorage.setItem('Flowers', JSON.stringify(OneFlower.all));
  renderToHtml();
  }
  // event.preventDefault();
  // let oneFlower = new OneFlower(Flowers.all[event.target.cat.value], event.target.cat.value, event.target.seaion.value);
  // oneFlower.addProduct();
};
const handelDeleteAll = function (event) {

  OneFlower.all = [];
  localStorage.removeItem('Flowers');
  renderToHtml();
};


const renderToHtml = function () {
  allFlowers.innerHTML = '';
  if (localStorage.Flowers) {

    let data = JSON.parse(localStorage.getItem('Flowers'));
    const table = document.createElement('table');

    const trHead = document.createElement('tr');

    const thtag1 = document.createElement('th');
    thtag1.textContent = '#';
    trHead.appendChild(thtag1);
    const thtag2 = document.createElement('th');
    thtag2.textContent = 'Image';
    trHead.appendChild(thtag2);
    const thtag3 = document.createElement('th');
    thtag3.textContent = 'Name';
    trHead.appendChild(thtag3);
    const thtag4 = document.createElement('th');
    thtag4.textContent = 'Seasn';
    trHead.appendChild(thtag4);
    table.appendChild(trHead);
    allFlowers.appendChild(table);

    for (let index = 0; index < data.length; index++) {

      // OneFlower.all.push(JSON.parse(localStorage.getItem('Flowers'))[index]);

      const trbody = document.createElement('tr');

      const tdtag1 = document.createElement('td');
      tdtag1.setAttribute('id', 'delete');
      tdtag1.innerHTML = `<span id='${index}' class='deleteOnne' > X</span>`;
      trbody.appendChild(tdtag1);
      const tdtag2 = document.createElement('td');
      tdtag2.innerHTML = `<img src='${data[index].flower.path}'/>`;
      trbody.appendChild(tdtag2);
      const tdtag3 = document.createElement('td');
      tdtag3.textContent = data[index].name;
      trbody.appendChild(tdtag3);
      const tdtag4 = document.createElement('td');
      tdtag4.textContent = data[index].season;
      trbody.appendChild(tdtag4);
      table.appendChild(trbody);
      allFlowers.appendChild(table);

    }
  }
};


const retriveDataFromLocalStorage = function () {
  if (localStorage.Flowers) {
    let data = JSON.parse(localStorage.getItem('Flowers'));
    for (let index = 0; index < data.length; index++) {

      OneFlower.all.push(JSON.parse(localStorage.getItem('Flowers'))[index]);
    }
  }

};


const allFlowers = document.getElementById('allFlowers');
const form = document.getElementById('form');
form.addEventListener('submit', handelAdd);


const deleteit = document.getElementById('allFlowers');
deleteit.addEventListener('click', handelDeleteOne);

const Cleara = document.getElementById('Cleara');
Cleara.addEventListener('click', handelDeleteAll);

retriveDataFromLocalStorage();
renderToHtml();