export interface Element {
  type: any;
  props: { [key: string]: any };
  children: Array<Element>;
}
import { flatMap } from 'lodash';

const TEXT_ELEMENT = 'TEXT ELEMENT';

export function render(parentDom: any, element: Element) {
  if (!element.type) return;
  let dom;
  if (typeof element.type === 'string') {
    dom =
      element.type === TEXT_ELEMENT
        ? document.createTextNode(element.props.text)
        : document.createElement(element.type);

    if (element.props) {
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
    }

    element.children &&
      element.children.filter(x => x !== null).forEach(x => render(dom, x));
    parentDom.appendChild(dom);
  } else {
    const type: Component = new element.type(element.props);
    return render(parentDom, type.render());
  }
}

export function createElement(
  type: string,
  props: { [key: string]: any } = {},
  ...children: Array<Element | string>
): Element {
  const newChildren: Element[] = flatMap(children).map(x => {
    if (typeof x === 'string') {
      return {
        type: TEXT_ELEMENT,
        props: {
          text: x
        },
        children: []
      };
    } else {
      return x;
    }
  });

  return { type, props, children: newChildren };
}

export abstract class Component {
  props: any;
  constructor(props: any) {
    this.props = props;
  }
  abstract render(): Element;
}
