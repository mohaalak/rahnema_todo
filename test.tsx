import Rahnemaak, { Element } from './rahnemaak';
// @jsx Rahnemaak.createElement
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

const dard = () => (
  <div>
    <h1>Hello World</h1>
    <button onClick={e => alert('salam')}>maraz</button>
  </div>
);

dard();

const root = document.getElementById('root');
Rahnemaak.render(root, kooft);
