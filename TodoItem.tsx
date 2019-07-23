import * as React from 'react';

export const TodoItemComponent = ({ todo, toggle }: any) => (
  <li className={todo.checked ? 'checked' : ''} onClick={toggle}>
    <div>{todo.text}</div>
  </li>
);
