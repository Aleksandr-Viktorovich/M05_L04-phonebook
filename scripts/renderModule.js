import * as control from "./creatModule.js";

export const renderPhoneBook = (app, title) => {
  const header = control.createHeader();
  const logo = control.createLogo(title);
  const main = control.createMain();
  const buttonGroup = control.createButtonsGroup([
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
  const table = control.createTable();
  const {form, overlay} = control.createForm();
  const footer = control.createFooter();
  const copyright = control.createCopyright(title);

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
export const renderContacts = (elem, data) => {
  const allRow = data.map(control.createRow);
  elem.append(...allRow)
  return allRow.sort((x, y) => ((x.children.innerText < y.children.innerText) ? - 1 : 1));
};
