import * as Rahnemaak from './rahnemaak';
// @jsx Rahnemaak.createElement
export class TodoItemComponent extends Rahnemaak.Component {
  render() {
    const { todo, toggle } = this.props;
    const className = todo.checked ? 'checked' : '';
    return (
      <li className={className} onClick={() => toggle(todo)}>
        {todo.text}
      </li>
    );
  }
}
