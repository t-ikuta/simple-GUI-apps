const App = {
  hoverDuration: 2000,
  fadeInDuration: 300,
  fadeOutDuration: 700,
  // handleMouseOver(e) {
  //   const $img = $(e.target);

  //   if (this.timer) {
  //     clearTimeout(this.timer);
  //     this.timer = null;
  //   }

  //   // fade out the description if the timer is valid after 2000 sec (default duration)
  //   this.timer = setTimeout(() => {
  //     if (this.timer) {
  //       $img.next('.description').fadeIn(this.fadeInDuration);
  //     }
  //     debugger;
  //   }, this.hoverDuration);
  // },
  // handleMouseLeave(e) {
  //   const $img = $(e.target);
  //   // fade out the description and reset the timer
  //   $img.next('.description').fadeOut(this.fadeOutDuration);
  //   this.timer = null;
  // },
  bind() {
    let timer;

    $('img').on({
      mouseover: (e) => {
        const $img = $(e.target);
        debugger;
        if (timer) {
          clearTimeout(timer);
          // timer = null;
        }

        // fade out the description if the timer is valid after 2000 sec (default duration)
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
        clearTimeout(timer);
        // timer = null;
      },
    })
    // $('img').on({
    //   mouseover: this.handleMouseOver,
    //   mouseleave: this.handleMouseLeave,
    // })
  },
  init() {
    this.bind()
  }
}

// $(() => {

// })

App.init();