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
  deleteTodo(id) {
    $('li').filter(function() {
      return $(this).attr('data-id') === id;
    }).remove();

    // const lis = Array.prototype.slice.call(document.querySelectorAll('li')).filter(el => {
    //   return $(el).attr('data-id') === this.id;
    // })
    // $(li).remove();

    this.deleteOvelayAndModal();
  },
  handleTodoDeletion(id) {
    $(document).on('click', e => {
      e.preventDefault();

      var $e = $(e.target);
      if ($e.prop('tagName') === 'LI' && $e.attr('class') === 'delete') {
        this.deleteTodo(id);
      }

      $('.contextmenu').remove();
    })
  },
  // handleTodoDeletion() {
  //   $('.overlay, .delete-no').on('click', e => this.deleteOvelayAndModal());
  //   $('.delete-yes').on('click', e => this.deleteTodo())
  // },
  handleTodoModal() {
    // $('li').on('contextmenu', e => {
    //   e.preventDefault();
    //   // this.id = $(e.target).parent('li').attr('data-id');
    //   // this.showModal();
    //   // this.handleTodoDeletion();
    // })
  },
  handleContextMenu() {
    $('li').on('contextmenu', e => {
      e.preventDefault();
      const id = $(e.target).attr('data-id');
      this.renderContextMenu(id, e.pageX, e.pageY);
    });
  },
  deleteOvelayAndModal() {
    $('.overlay, .delete-modal').hide();
  },
  renderContextMenu(id, x, y) {
    // remove the previously shown context menu
    $('.contextmenu').remove();

    // render the current context menu
    const templateHTML = $('#contextmenu-template').html();
    const contextmenuTemplate = Handlebars.compile(templateHTML);
    const contextmenuHTML = contextmenuTemplate({id: id});
    $(contextmenuHTML).insertAfter('h1').offset({top: y, left: x}).fadeIn(200);
    this.handleTodoDeletion(id);
  },
  renderTodos() {
    const templateHTML = $('#todos-template').html();
    const template = Handlebars.compile(templateHTML);
    const todos = template({ todos: todo_items });
    $('h1').after(todos);
  },
  init() {
    this.renderTodos();
    this.handleContextMenu();
    // this.handleTodoModal();
    // this.id = null;
  }
}

App.init();