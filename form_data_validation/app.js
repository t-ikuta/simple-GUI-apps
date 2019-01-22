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
    const self = this;
    this.$form.find('input').each(function() {
      if (!$(this)[0].checkValidity()) {
        self.displayErrorMessage($(this));
        errorCount += 1;
      }
    });

    return errorCount;
  },
  displayErrorMessage($element) {
    let errorMessage;

    if ($element.prop('tagName') === 'INPUT') {
      errorMessage = this.determineErrorMessage($element);
      $element.next('span.error_message').text(errorMessage);
      $element.addClass('input_error');
    } else if ($element.prop('tagName') === 'FORM') {
      errorMessage = 'Please correct invalid field(s) before submitting the form.';
      const $formErrorbox = this.$form.find('span.form_error');
      $formErrorbox.addClass('form_error');
      $formErrorbox.text(errorMessage);      
    }
  },
  validateInputOnBlur(e) {
    const $input = $(e.target);

    if (!$input[0].checkValidity()) {
      this.displayErrorMessage($input);
    } else {
      // remove error message for the previously invalid field
      $input.next('span.error_message').text('');
      $input.removeClass('input_error');

      // remove error for the form when there is no error
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

    const errorCount = this.countErrors();

    if (errorCount) {
      this.displayErrorMessage(this.$form);
    }
  },
  init() {
    $('input').on('blur', e => this.validateInputOnBlur(e));
    $('input').on('focus', e => this.validateInputOnFocus(e));
    this.$form.on('submit', e => this.validateForm(e));
  }
}

App.init();