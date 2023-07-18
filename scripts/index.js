import getStorage from './storageModule.js';
import {renderPhoneBook, renderContacts} from './renderModule.js';
import {modalControl, deleteControl, formControl, hoverRow} from './controlModule.js';

{




  //Функция запуска
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage('key');


    const {list, logo, btnAdd, formOverlay, form, btnDel, listSort} = renderPhoneBook(app, title);

    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);//1.9 Вызов функции работы с модальным окном

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);//2.2 Вызов функции удаления
    formControl(form, list, closeModal); //3.2 Вызов функции обработки событий на форме


    const showSort = () => {
      //получаем таргет элемента, на основании которого будет сортироватиься список (имя/фамилия)
      let position;

      //Фуекция сортировки
      const sortBody = (position) => {
        return allRow.sort((x, y) => ((x.children[position].innerText < y.children[position].innerText) ? -1 : 1));
      };

      //Функция сортировки по клику
      listSort.addEventListener('click', e => {
        const target = e.target;
        //Получаем элемент клика по индексу
        const headTarget = listSort.children[0].children;
        if (headTarget) {
          position = [...headTarget].findIndex(elem => elem === target);
          list.replaceChildren(...sortBody(position));
        }
      });
    };
    showSort()

    document.addEventListener('touchstart', (e) => {

    });

    document.addEventListener('touchmove', (e) => {

    });

    document.addEventListener('touchend', (e) => {

    });

  };

  window.phoneBookInit = init;
}
