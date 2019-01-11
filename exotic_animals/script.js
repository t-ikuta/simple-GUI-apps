const App = {
  hoverDuration: 2000,
  fadeInDuration: 300,
  fadeOutDuration: 700,
  bind() {
    let timer;

    $('img').on({
      mouseover: (e) => {
        const $img = $(e.target);
        // fade in the description if the timer is valid after 2000 sec (default duration)
        timer = setTimeout(() => {
          if (timer) {
            $img.next('.description').fadeIn(this.fadeInDuration);
          }
        }, this.hoverDuration);
      },
      mouseleave: (e) => {
        const $img = $(e.target);
        // fade out the description and reset the timer
        $img.next('.description').fadeOut(this.fadeOutDuration);

        if (timer) {
          clearTimeout(timer);
        }
      },
    })
  },
  init() {
    this.bind()
  }
}

App.init();