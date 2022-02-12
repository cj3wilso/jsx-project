function createElement(tag, props, ...children) {
  if (typeof tag === "function") return tag(props, children);
  const element = document.createElement(tag);
  Object.entries(props || {}).forEach(([name, value]) => {
    if (name.startsWith('on') && name.toLowerCase() in window) element.addEventListener(name.toLowerCase().substr(2), value);else element.setAttribute(name, value.toString());
  });
  children.forEach(child => {
    appendChild(element, child);
  });
  return element;
}

const appendChild = (parent, child) => {
  if (Array.isArray(child)) child.forEach(nestedChild => appendChild(parent, nestedChild));else parent.appendChild(child.nodeType ? child : document.createTextNode(child));
};

const createFragment = (props, ...children) => {
  return children;
};

const name = 'Geoff';
const friends = ['Sarah', 'James', 'Hercule'];
const app = createElement("div", {
  className: "app"
}, createElement("h1", {
  className: "title"
}, " Hello, world! "), createElement("p", null, " Welcome back, ", name, " "), createElement("p", null, createElement("strong", null, "Your friends are:")), createElement("ul", null, friends.map(name => createElement("li", null, name))));
window.document.getElementById('app').replaceWith(app);