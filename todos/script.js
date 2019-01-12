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
  deleteTodo() {
    const self = this;
    $('li').filter(function() {
      return $(this).attr('data-id') === self.id;
    }).remove();

    // const lis = Array.prototype.slice.call(document.querySelectorAll('li')).filter(el => {
    //   return $(el).attr('data-id') === this.id;
    // })
    // $(li).remove();

    this.deleteOvelayAndModal();
  },
  handleTodoDeletion() {
    $('.overlay, .delete-no').on('click', e => this.deleteOvelayAndModal());
    $('.delete-yes').on('click', e => this.deleteTodo())
  },
  handleTodoModal() {
    $('.delete').on('click', e => {
      e.preventDefault();
      this.id = $(e.target).parent('li').attr('data-id');
      this.showModal();
      this.handleTodoDeletion();
    })
  },
  deleteOvelayAndModal() {
    $('.overlay, .delete-modal').hide();
    // $('.delete-modal').hide();
  },
  renderTodos() {
    const templateHTML = $('#todos-template').html();
    const template = Handlebars.compile(templateHTML);
    const todos = template({ todos: todo_items });
    $('h1').after(todos);
  },
  init() {
    this.renderTodos();
    this.handleTodoModal();
    this.id = null;
    // this.handleModalDeletion();
  }
}

App.init();