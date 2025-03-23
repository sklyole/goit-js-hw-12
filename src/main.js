import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getData } from './js/pixabay-api';
import {
  clearGallery,
  renderGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('form');
const input = document.querySelector("input[name='search-text']");
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let query = '';
let totalHits = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  if (query === '') {
    iziToast.show({
      title: 'Error',
      message: 'Please enter a search query!',
      position: 'topRight',
      backgroundColor: '#ef7975',
    });
    return;
  }

  page = 1;
  clearGallery();
  showLoader();

  try {
    const { hits, totalHits: total } = await getData(query, page);
    totalHits = total;

    if (hits.length === 0) {
      loadMoreBtn.classList.add('visually-hidden');
      iziToast.show({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: '#ef7975',
      });
    } else {
      renderGallery(hits);
      if (hits.length < 15 || hits.length >= totalHits) {
        loadMoreBtn.classList.add('visually-hidden');
        iziToast.show({
          title: 'End',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          backgroundColor: '#ff7b7b',
        });
      } else {
        loadMoreBtn.classList.remove('visually-hidden');
      }
    }
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
      backgroundColor: '#ef7975',
    });
  } finally {
    form.reset();
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  showLoader();

  try {
    const { hits } = await getData(query, page);

    renderGallery(hits);

    if (hits.length < 15 || page * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        title: 'Error',
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
        backgroundColor: '#ef7975',
      });
    }

    pageScroll();
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: 'Sorry, there are no images matching your search query.',
      position: 'topRight',
      backgroundColor: '#ef7975',
    });
  } finally {
    hideLoader();
  }
});

function pageScroll() {
  const firstElement = gallery.firstElementChild;
  if (firstElement) {
    const { height } = firstElement.getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  }
}
