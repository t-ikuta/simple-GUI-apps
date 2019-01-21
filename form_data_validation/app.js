const App = {
  $form: $('form'),
  determineErrorMessage($input) {
    const field = this.$form.find(`[for=${$input.attr('id')}]`).text();
    const errorTypes = $input[0].validity;
    let errorMessage;

    if (errorTypes.valueMissing) {
      errorMessage = `${field} is required.`;
    } else if (errorTypes.tooShort) {
      errorMessage = `${field} is too short.`;
      if (field === 'Password') {
        errorMessage += ' The password should be at least 10-character long.';
      }
    } else if (errorTypes.patternMismatch) {
      let validFormat;
      if (field === 'Email') {
        validFormat = 'example@email.com';
      } else if (field === 'Phone Number') {
        validFormat = '123-123-1234';
      }
      errorMessage = `The format of ${field} is invalid. The valid format is as follows: ${validFormat}`;
    }

    return errorMessage;
  },
  countErrors() {
    let errorCount = 0;

    this.$form.find('input').each(function() {
      if (!$(this)[0].checkValidity()) {
        this.displayErrorMessage($(this));
        errorCount += 1;
      }
    });

    return errorCount;
  },
  displayErrorMessage($element) {
    // TODO
  },
  validateInputOnBlur(e) {
    const $input = $(e.target);
    debugger;
    if (!$input[0].checkValidity()) {
      const errorMessage = this.determineErrorMessage($input);
      if (errorMessage) {
        $input.next('span.error_message').text(errorMessage);
        $input.addClass('input_error');
      }
    } else {
      // remove error message for the previously invalid field
      $input.next('span.error_message').text('');
      $input.removeClass('input_error');

      const errorCount = this.countErrors();
      if (!errorCount) {
        $('span.form_error').text('');
      }
    }
  },
  validateInputOnFocus(e) {
    const $input = $(e.target);

    $input.next('span.error_message').text('');
  },
  validateForm(e) {
    e.preventDefault();

    const errorMessage = 'Please correct invalid field(s) before submitting the form.';
    const errorCount = this.countErrors();

    if (errorCount) {
      // TODO: replace the below with the displayErrorMessage method
      const $formErrorbox = this.$form.find('span.form_error');
      $formErrorbox.addClass('form_error');
      $formErrorbox.text(errorMessage);
    }
  },
  init() {
    $('input').on('blur', e => this.validateInputOnBlur(e));
    $('input').on('focus', e => this.validateInputOnFocus(e));
    this.$form.on('submit', e => this.validateForm(e));
  }
}

App.init();