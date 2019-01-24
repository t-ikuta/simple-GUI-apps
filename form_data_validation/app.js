const App = {
  $form: $('form'),
  $inputs: $('input'),
  getFieldName($input) {
    return this.$form.find(`[for=${$input.attr('data-cc-label') || $input.attr('id')}]`).text();
  },
  determineErrorMessage($input) {
    const field = this.getFieldName($input);
    const errorTypes = $input[0].validity;
    let errorMessage;

    if (errorTypes.valueMissing) {
      errorMessage = `${field} is required.`;
    } else if (errorTypes.tooShort) {
      errorMessage = `${field} is too short.`;
      if (field === 'Password') {
        errorMessage += ' The password should be at least 10-character long.';
      }
    } else if (errorTypes.tooLong) {
      errorMessage = `${field} is too short.`;
    } else if (errorTypes.patternMismatch) {
      let validFormat;
      if (field === 'Email') {
        validFormat = 'example@email.com';
        errorMessage = `The format of ${field} is invalid. The valid format is as follows: ${validFormat}`;
      } else if (field === 'Phone Number') {
        validFormat = '123-123-1234';
        errorMessage = `The format of ${field} is invalid. The valid format is as follows: ${validFormat}`;
      } else if (field === 'First Name' || field === 'Last Name') {
        errorMessage = `${field} should only consist of alphabetical characters.`
      } else if (field === 'Credit Card') {
        errorMessage = `Each field in ${field} should consist of a 4-digit number.`;
      }
    }

    return errorMessage;
  },
  countErrors() {
    let errorCount = 0;
    const self = this;
    this.$form.find('input').each(function() {
      if (!$(this)[0].checkValidity()) {
        errorCount += 1;
      }
    });

    return errorCount;
  },
  displayErrorMessage($element) {
    let errorMessage;
    const tagName = $element.prop('tagName');

    if (tagName === 'INPUT') {
      errorMessage = this.determineErrorMessage($element);
      $element.next('span.error_message').text(errorMessage);
      $element.addClass('input_error');
    } else if (tagName === 'FORM') {
      // display error messages by triggering the blur event for each input
      $element.find('input').each(function() {
        $(this).trigger('blur');
      });

      // display error message for form
      const errorMessageForForm = 'Please correct invalid field(s) before submitting the form.';
      const $formMessageBox = this.$form.find('span.form_message');
      $formMessageBox.addClass('error_message');
      $formMessageBox.text(errorMessageForForm);
    }
  },
  displaySuccessMessage($form) {
    const $formMessageBox = this.$form.find('span.form_message');
    const successMessageForForm = 'Form has been submitted successfully.';
    $formMessageBox.addClass('success_message');
    $formMessageBox.text(successMessageForForm);
  },
  validateInputOnBlur(e) {
    const $input = $(e.target);

    if (!$input[0].checkValidity()) {
      this.displayErrorMessage($input);
    } else {
      // remove error message for the previously invalid field
      $input.next('span.error_message').text('');
      $input.removeClass('input_error');

      // remove error for the form when there is no input errors
      const errorCount = this.countErrors();
      if (!errorCount) {
        $('span.form_message').text('');
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
    } else {
      this.displaySuccessMessage(this.$form);
    }
  },
  validateKey(e) {
    const $input = $(e.target);
    const field = this.getFieldName($input);
    const key = e.key;
    let pattern;

    if (['First Name', 'Last Name'].includes(field)) {
      pattern = /[a-z'\s]/i;
    } else if (field === 'Credit Card') {
      pattern = /\d/;
    }

    if (pattern) {
      if (!pattern.test(key)) e.preventDefault();
    }
  },
  tabForward($cc) {
    const value = $cc.val();

    if (value.length === 3) {
      const nextId = Number($cc.attr('id')[2]) + 1;
      $(`#cc${nextId}`).trigger('focus');
    }
  },
  handleTabForwarding(e) {
    const $cc = $(e.target);
    const index = $cc.index('input[name=cc]');

    if (index < 3) {
      this.tabForward($cc);
    }
  },
  bindEventsOnInput() {
    this.$inputs.on('blur', e => this.validateInputOnBlur(e));
    this.$inputs.on('focus', e => this.validateInputOnFocus(e));
    this.$inputs.on('keypress', e => this.validateKey(e));
    this.$inputs.filter('[name=cc]').on('keypress', e => this.handleTabForwarding(e));
  },
  init() {
    this.bindEventsOnInput();
    this.$form.on('submit', e => this.validateForm(e));
  }
}

App.init();