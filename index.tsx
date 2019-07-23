import * as Rahnemaak from './rahnemaak';
import { TodoItemComponent } from './TodoItem';
// @jsx Rahnemaak.createElement
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

class TodoApplication {
  state: TodoState = {
    todos: [{ text: 'Hamid', checked: true }],
    status: 'all'
  };
  constructor() {
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  setState(state: Partial<TodoState>) {
    this.state = { ...this.state, ...state };

    renderApp();
  }

  private setStatus(status: TodoStatus) {
    this.setState({ status });
  }

  private addTodo(e: any) {
    e.preventDefault();
    const todo = e.target.children[0].value;

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

  renderForm() {
    return (
      <form onSubmit={this.addTodo}>
        <input />
        <button>Submit</button>
      </form>
    );
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
        {this.renderForm()}
        {this.renderTodoContainer()}
        {this.renderFooter()}
      </div>
    );
  }
}

const todoApp = new TodoApplication();

function renderApp() {
  const element = todoApp.render();
  removeChildren();

  Rahnemaak.render(root, element);
}

renderApp();
