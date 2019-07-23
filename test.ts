import Rahnemaak, { Element } from './rahnemaak';

const kooft: Element = {
  type: 'div',
  props: {
    className: 'container'
  },
  children: [
    { type: 'h1', props: { textContent: 'Hello world' }, children: [] },
    { type: 'button', props: { onClick: e => alert('salam') }, children: [] }
  ]
};

const root = document.getElementById('root');
Rahnemaak.render(root, kooft);
