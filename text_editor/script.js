const App = {
  handleStyling(e) {
    e.preventDefault();
    const $parentLi = $(e.target).closest('li');
    $parentLi.toggleClass('highlighted')

    const style = $parentLi.attr('class').split(/\s/)[0];
    switch (style) {
      case "bold":
        document.execCommand('bold');
    }
  },
  init() {
    $('.menu a').on('click', e => this.handleStyling(e));
  }
}

App.init();