// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  var currentCart = getLocalStorage(key)
  if(!currentCart){
    currentCart = [];
  }
  currentCart.push(data)
  localStorage.setItem(key, JSON.stringify(currentCart));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderWithTemplate(template, parentElement){
 parentElement.insertAdjacentHTML("afterbegin", template);
}

async function loadTemplate(path){
  let locate = await fetch (path); // return fetch path
  let template = await locate.text();
  return template;

}

export async function loadHeaderFooter(){
  const header = await loadTemplate("../public/partials/header.html");
  const footer = await loadTemplate("../public/partials/footer.html");
  const headElement = document.querySelector("#parentHeader");
  const footElement = document.querySelector("#parentFooter");
  let head = renderWithTemplate(header, headElement);
  let foot = renderWithTemplate(footer, footElement);

  
}