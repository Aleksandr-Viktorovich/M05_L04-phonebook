//1.1 Работа с модальной формой
import {removeStorage, setStorage} from "./storageModule.js";
import {createRow} from "./creatModule.js";

export const modalControl = (btnAdd, formOverlay) => {

  //1.2 Фуекция открытия модального окна
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  // 1.5 Фуекция закрытия модального окна
  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  }

  //1.3 Событие "клик" на открытие модального окна
  btnAdd.addEventListener('click', openModal);//1.4 Вызов функции на открытие

  //1.6 Событие "клик" на закрытие модального окна
  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.classList.contains('close')) {
      closeModal();//1.7 Вызов функции на закрытие
    }
  });
  return {
    closeModal,//1.8 Возвращаем закрытие окна в виде объекта
  }
};


//2.1 Фуекция для удаления данных в таблице
export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if(target.closest('.del-icon')) {
      const contactDel = target.closest('.contact');
      const phoneItem = contactDel.querySelector('a').textContent;
      removeStorage(phoneItem,'key');
      contactDel.remove();
    }
  });
};

//5.1 Функция добавления контактов на страницу
export const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};


//3.1 Функция обработки событий на форме
export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    addContactPage(newContact, list)//5.2 Вызов функции добавления контактов на страницу

    setStorage('key', newContact);//4.2 Вызов функции добавления контактов
    form.reset();
    closeModal();
  });
};


export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};
