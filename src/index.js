import './sass/main.scss';
import { fetchByName } from './js/fetchCountries';
import countriesList from './handlebars/countriesList.hbs';
import countryDescription from './handlebars/countryDescr.hbs';
import debounce from 'lodash.debounce';

import { alert, Stack, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const stackBottomModal = new Stack({
  dir1: 'down',
  firstpos1: 30,
});

defaults.delay = 2000;
defaults.addModalClass = 'justify-content: center';

const containerRef = document.querySelector('.country-list');
const inputRef = document.querySelector('.search');

inputRef.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  const formRef = event.target.value;
  const inputValue = formRef.toLowerCase().trim();
  containerRef.innerHTML = '';
  if (!inputValue) {
    return;
  }
  console.log(inputValue);
  fetchByName(formRef)
    .then(user => renderCountries(user))
    .catch(error => renderError(error));
}

const renderError = () => {
  alert({
    text: 'Некорректный ввод! 🤕',
    addClass: 'angeler-extended',
    stack: stackBottomModal,
  });
};

const renderCountries = country => {
  if (country.length >= 2 && country.length <= 10) {
    let countriesElems = countriesList(country);
    containerRef.innerHTML = countriesElems;
  }
  if (country.length === 1) {
    let countriesElems = countryDescription(country);
    containerRef.innerHTML = countriesElems;
  }
  if (country.length > 10) {
    alert({
      text: 'Сузьте поиск страны!😀',
      stack: stackBottomModal,
    });
  }
};