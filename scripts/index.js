'use strict';

const getStorage = (key) => {
  let arrData = localStorage.getItem(key);
  if (arrData !== null) {
    return JSON.parse(arrData);
  }
  return [];
}


const setStorage = (key, objData) => {
  let newArr = getStorage(key);
  newArr.push(objData);
  localStorage.setItem(key, JSON.stringify(newArr));
}


const removeStorage = (phoneNum, key) => {
  const arrObj = getStorage(key);
  localStorage.removeItem('key');
  arrObj.forEach(objData => {
    if (objData.phone === phoneNum) return;
    setStorage(key, objData);
  });
};


// 4.1 Функция для добавления новых контактов
const addContactData = (contact) => {
  // data.push(contact);
  // setStorage('key', contact);
};


{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}!`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');

    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
         <th class="delete">Удалить</th>
         <th class="nameTarget">Имя</th>
         <th class="surnameTarget">Фамилия</th>
         <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;
    table.thead = thead;
    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label">
            Имя
          <input class="form-input" name="name" type="text" required>
        </label>
      </div>

      <div class="form-group">
        <label class="form-label">
            Фамилия
          <input class="form-input" name="surname" type="text" required>
        </label>
      </div>

      <div class="form-group">
        <label class="form-label">
            Телефон
          <input class="form-input" name="phone" type="number" required>
        </label>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-4',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('main');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    return footer;
  };

  const createCopyright = title => {
    const p = document.createElement('p');
    p.textContent = `Все права защищены. ©${title}!`;
    return p;
  };

  const renderPhoneBook = (app, title) => {
   const header = createHeader();
   const logo = createLogo(title);
   const main = createMain();
   const buttonGroup = createButtonsGroup([
     {
       className: 'btn btn-primary mr-4',
       type: 'button',
       text: 'Добавить',
     },
     {
       className: 'btn btn-danger',
       type: 'button',
       text: 'Удалить',
     },
   ]);
   const table = createTable();
   const {form, overlay} = createForm();
   const footer = createFooter();
   const copyright = createCopyright(title);

   header.headerContainer.append(logo);
   main.mainContainer.append(buttonGroup.btnWrapper, table, overlay,);
   footer.footerContainer.append(copyright);
   app.append(header, main, footer);

   return {
     list: table.tbody,
     listSort:table.thead,
     logo,
     btnAdd: buttonGroup.btns[0],
     btnDel: buttonGroup.btns[1],
     formOverlay: overlay,
     form: form,
   };
 };

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const btnEdit = document.createElement('button');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    btnEdit.classList.add('btn-edit');
    tdName.prepend(btnEdit);
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;

    tdPhone.append(phoneLink);
    tdPhone.append(btnEdit);
    tr.append(tdDel, tdName, tdSurname, tdPhone);
    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow)
    return allRow.sort((x, y) => ((x.children.innerText < y.children.innerText) ? - 1 : 1));
  };

  const hoverRow = (allRow, logo) => {
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

  //1.1 Работа с модальной формой
  const modalControl = (btnAdd, formOverlay) => {

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
  const deleteControl = (btnDel, list) => {
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
  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };


  //3.1 Функция обработки событий на форме
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);

      addContactPage(newContact, list)//5.2 Вызов функции добавления контактов на страницу

      setStorage('key', newContact);//4.2 Вызов функции добавления контактов
      // setStorage(newContact)
      form.reset();
      closeModal();
    });
  };

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
