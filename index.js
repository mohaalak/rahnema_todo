const root = document.getElementById('root');
function removeChildren() {
  for (const child of root.children) {
    root.removeChild(child);
  }
}
removeChildren();

class TodoApplication {
  constructor() {
    this.addTodo = this.addTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.state = {
      todos: [{ text: 'Hamid', checked: true }],
      status: 'all'
    };
  }

  setState(state) {
    this.state = { ...this.state, ...state };
    console.log(this.state);
    render();
  }

  setStatus(status) {
    this.setState({ status });
  }
  addTodo(e) {
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
  toggleTodo(todoItem) {
    const foundTodo = this.state.todos.find(x => x === todoItem);
    foundTodo.checked = !foundTodo.checked;

    this.setState({
      todos: this.state.todos
    });
  }

  renderForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    input['name'] = 'todoInput';
    button.textContent = 'Submit';

    form.addEventListener('submit', this.addTodo);

    form.appendChild(input);
    form.appendChild(button);
    return form;
  }

  renderTodoItem(todo) {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.text;
    if (todo.checked) {
      todoItem.className = 'checked';
    }
    todoItem.addEventListener('click', () => this.toggleTodo(todo));
    return todoItem;
  }
  renderTodoContainer() {
    const todoContainer = document.createElement('ul');

    for (const todo of this.getTodos()) {
      todoContainer.appendChild(this.renderTodoItem(todo));
    }

    return todoContainer;
  }

  renderFooter() {
    const div = document.createElement('div');
    const all = document.createElement('button');
    const done = document.createElement('button');
    const todo = document.createElement('button');

    all.textContent = 'All';
    done.textContent = 'Done';
    todo.textContent = 'Todo';

    const { status } = this.state;

    if (status === 'all') {
      all.className = 'active';
    }
    if (status === 'todo') {
      todo.className = 'active';
    }

    if (status === 'done') {
      done.className = 'active';
    }

    all.addEventListener('click', () => this.setStatus('all'));
    done.addEventListener('click', () => this.setStatus('done'));
    todo.addEventListener('click', () => this.setStatus('todo'));

    div.appendChild(all);
    div.appendChild(done);
    div.appendChild(todo);
    return div;
  }

  render() {
    const div = document.createElement('div');
    const form = this.renderForm();
    const todoContainer = this.renderTodoContainer();
    const footer = this.renderFooter();
    div.appendChild(form);
    div.appendChild(todoContainer);
    div.appendChild(footer);
    return div;
  }
}

const todoApp = new TodoApplication();

function render() {
  const dom = todoApp.render();
  removeChildren();
  root.appendChild(dom);
}

render();
