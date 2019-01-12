const todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

const App = {
  showModal() {
    $('.overlay').show();
    $('.delete-modal').show();
    const top = $('html').scrollTop();
    $('.delete-modal').offset({ top: top + 200 });
  },
  handleTodoDeletion() {
    $('.delete').on('click', e => {
      e.preventDefault();
      this.showModal();
    })
  },
  deleteDialog() {
    $('.overlay').hide();
    $('.delete-modal').hide();
  },
  handleModalDeletion() {
    $('.overlay').on('click', e => this.deleteDialog());
    $('.delete-no').on('click', e => this.deleteDialog());
  },
  renderTodos() {
    const templateHTML = $('#todos-template').html();
    const template = Handlebars.compile(templateHTML);
    const todos = template({ todos: todo_items });
    $('h1').after(todos);
  },
  init() {
    this.renderTodos();
    this.handleTodoDeletion();
    this.handleModalDeletion();
  }
}

App.init();