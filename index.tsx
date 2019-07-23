import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TodoItemComponent } from './TodoItem';
import { OneForm } from './OneForm';

const root = document.getElementById('root');
function removeChildren() {
  for (const child of root.children) {
    root.removeChild(child);
  }
}
removeChildren();

interface TodoItem {
  text: string;
  checked: boolean;
}
type TodoStatus = 'all' | 'done' | 'todo';
interface TodoState {
  todos: TodoItem[];
  status: TodoStatus;
}

class TodoApplication extends React.Component {
  state = {
    todos: [{ text: 'Hamid', checked: true }],
    status: 'all'
  };
  constructor(props) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  private setStatus(status: TodoStatus) {
    this.setState({ status: status });
  }

  private addTodo(todo: string) {
    this.setState({
      todos: [...this.state.todos, { text: todo, checked: false }]
    });
  }

  getTodos() {
    const { status, todos } = this.state;

    if (status === 'all') {
      return todos;
    }
    if (status === 'done') {
      return todos.filter(x => x.checked);
    }

    if (status === 'todo') {
      return todos.filter(x => !x.checked);
    }
  }
  toggleTodo(todoItem: TodoItem) {
    const foundTodo = this.state.todos.find(x => x === todoItem);
    foundTodo.checked = !foundTodo.checked;

    this.setState({
      todos: this.state.todos
    });
  }

  renderTodoItem(todo: TodoItem) {
    console.log('salam');
    return <TodoItemComponent todo={todo} toggle={this.toggleTodo} />;
  }
  renderTodoContainer() {
    return <ul>{this.getTodos().map(x => this.renderTodoItem(x))}</ul>;
  }

  renderFooterButton(text: string, inputStatus: TodoStatus) {
    const { status } = this.state;
    return (
      <button
        className={status === inputStatus ? 'active' : ''}
        onClick={e => this.setStatus(inputStatus)}
      >
        {text}
      </button>
    );
  }
  renderFooter() {
    return (
      <div>
        {this.renderFooterButton('All', 'all')}
        {this.renderFooterButton('Done', 'done')}
        {this.renderFooterButton('Todo', 'todo')}
      </div>
    );
  }

  render() {
    return (
      <div>
        <OneForm submit={this.addTodo} />
        {this.renderTodoContainer()}
        {this.renderFooter()}
      </div>
    );
  }
}

function renderApp() {
  ReactDOM.render(<TodoApplication />, root);
}

renderApp();
