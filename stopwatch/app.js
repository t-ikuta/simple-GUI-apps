const App = {
  $controls: $('#controls'),
  running: false,
  intervalId: null,
  start($button) {
    $button.text('Stop');
    this.running = true;

    this.intervalId = setInterval(() => {
      this.countCentiSeconds();
    }, 10);
  },
  countCentiSeconds() {
    const $centiseconds = $('#centiseconds');
    $centiseconds.text(Number($centiseconds.text()) + 1);

    const centiseconds = $centiseconds.text();

    if (Number(centiseconds) < 10) {
      $centiseconds.text('0' + centiseconds);
    } else if (Number(centiseconds) === 100) {
      $centiseconds.text('00');
      this.countSeconds();
    }
  },
  countSeconds() {
    let $seconds = $('#seconds');
    const updatedSeconds = +$seconds.text() + 1;

    $seconds.text(updatedSeconds);

    if (updatedSeconds < 10) {
      $seconds.text('0' + updatedSeconds);
    } else if (updatedSeconds === 60) {
      $seconds.text('00');
      this.countMinutes();
    }
  },
  countMinutes() {
    let $minutes = $('#minutes');
    $minutes.text(Number($minutes.text()) + 1);

    const minutes = $minutes.text();

    if (Number(minutes) < 10) {
      $minutes.text('0' + minutes);
    } else if (Number(minutes) === 60) {
      $minutes.text('00');
      this.countHours();
    }
  },
  countHours() {
    let $hours = $('#hours');
    $hours.text(Number($hours.text()) + 1);

    const hours = $hours.text();

    if (Number(hours) < 10) {
      $hours.text('0' + hours);
    } else if (Number(hours) === 60) {
      $hours.text('00');
      console.log('End of count reached.');
      clearInterval(this.intervalId);
    }
  },
  stop($button) {
    $button.text('Start');
    this.running = false;
    clearInterval(this.intervalId);
  },
  handleStartOrStop(e) {
    e.preventDefault();

    const $button = $(e.target);
    this.running ? this.stop($button) : this.start($button);
  },
  handleReset() {
    this.running = false;
    clearInterval(this.intervalId);
    $('#hours, #minutes, #seconds, #centiseconds').text('00');
    $('.start_or_stop').text('Start');
  },
  handleControls() {
    $('.start_or_stop').on('click', e => this.handleStartOrStop(e));
    $('.reset').on('click', e => this.handleReset(e));
  }
};

App.handleControls();