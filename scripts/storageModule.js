
export const getStorage = (key) => {
  let arrData = localStorage.getItem(key);
  if (arrData !== null) {
    return JSON.parse(arrData);
  }
  return [];
};


export const setStorage = (key, objData) => {
  let newArr = getStorage(key);
  newArr.push(objData);
  localStorage.setItem(key, JSON.stringify(newArr));
};


export const removeStorage = (phoneNum, key) => {
  const arrObj = getStorage(key);
  localStorage.removeItem('key');
  arrObj.forEach(objData => {
    if (objData.phone === phoneNum) return;
    setStorage(key, objData);
  });
};

export default getStorage;
