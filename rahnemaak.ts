export interface Element {
  type: string;
  props: { [key: string]: any };
  children: Element[];
}

function render(parentDom: HTMLElement, element: Element) {
  const dom = document.createElement(element.type);

  const isEventListener = (x: string) => x.substr(0, 2) === 'on';
  Object.keys(element.props)
    .filter(x => isEventListener(x))
    .forEach((key: string) =>
      dom.addEventListener(key.substr(2).toLowerCase(), element.props[key])
    );

  Object.keys(element.props)
    .filter(x => !isEventListener(x))
    .forEach((key: string) => {
      dom[key] = element.props[key];
    });

  element.children.filter(x => x !== null).forEach(x => render(dom, x));

  parentDom.appendChild(dom);
}

export default {
  render
};
