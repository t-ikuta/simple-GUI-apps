const App = {
  $entry: $('.entry'),
  $operation: $('.operation'),
  result: 0,
  operations: [],
  entryReset: true,
  updateEntry(operationType, currentEntry) {
    switch (operationType) {
      case 'c':
        currentEntry.textContent = '0';
        break;
      case 'ce':
        currentEntry.textContent = '0';
        break;
      case 'neg':
        if (!currentEntry.textContent.includes('-') && currentEntry.textContent !== '0') {
          currentEntry.textContent = '-' + currentEntry.textContent;
        }
        break;
      default:
        this.$entry.text(this.result);
    }
  },
  updateOperation(operationType, currentEntry, currentOperation) {
    debugger;
    switch (operationType) {
      case 'c':
        currentOperation.textContent = '';
        break;
      case '=':
        currentOperation.textContent = '';
        break;
      case '/':
        currentOperation.textContent += ` ${currentEntry.textContent} ÷`;
        break;
      case '*':
        currentOperation.textContent += ` ${currentEntry.textContent} x`;
        break;
      case '+':
        currentOperation.textContent += ` ${currentEntry.textContent} +`;
        break;
      case '-':
        currentOperation.textContent += ` ${currentEntry.textContent} -`;
        break;
    }

    if (operationType !== 'ce') this.operations.push(operationType);
  },
  resetConfig() {
    this.operations = [];
    this.entryReset = true;
  },
  getFinalResult(currentEntry) {
    const lastOperation = this.operations[this.operations.length - 1];

    switch (lastOperation) {
      case '+':
        return this.result + +currentEntry.textContent;
      case '-':
        return this.result - +currentEntry.textContent;
      case '*':
        return this.result * +currentEntry.textContent;
      case '/':
        return this.result / +currentEntry.textContent;
      case '%':
        return this.result % +currentEntry.textContent;
      default:
        return +currentEntry.textContent;
    }
  },
  updateResult(operationType, currentEntry, currentOperation) {
    // this.operations.push(operationType);
    // const lastOperation = this.operations[this.operations.length - 1];
    if (['c', 'ce', 'neg', '='].includes(operationType)) {
      switch(operationType) {
        case 'c':
          this.result = 0;
          this.resetConfig();
          break;
        case 'ce':
          debugger;
          return;
        case 'neg':
          this.result = -this.result;
          break;
        case '=':
          this.result = this.getFinalResult(currentEntry);
          this.resetConfig();
          break;
      }
    } else {
      const length = this.operations.length;
      const prevOperation = this.operations[length - 1];

      switch(prevOperation) {
        case '/':
          if (!currentOperation.textContent) return;
          this.result /= +currentEntry.textContent;
          break;
        case '*':
          if (!currentOperation.textContent) return;
          this.result *= +currentEntry.textContent;
          break;
        case '+':
          if (!currentOperation.textContent) return;
          this.result += +currentEntry.textContent;
          break;
        case '-':
          if (!currentOperation.textContent) return;
          this.result -= +currentEntry.textContent;
          break;
        case '%':
          if (!currentOperation.textContent) return;
          this.result %= +currentEntry.textContent;
          break;
        default:
          this.result = +currentEntry.textContent;
      }
    }
    console.log(this.result);
  },
  handleKeys() {
    $('.keys').on('click', 'span', e => {
      const $key = $(e.target);
      const operationType = $key.attr('data-operation');
      const currentEntry = this.$entry[0];
      const lastEntry = $key.text();
      const currentOperation = this.$operation[0];

      if (operationType) {
        this.updateResult(operationType, currentEntry, currentOperation);
        this.updateOperation(operationType, currentEntry, currentOperation);
        this.updateEntry(operationType, currentEntry);
        this.entryReset = true;
      } else {
        // Number entered
        if (this.entryReset) {
          // update entry
          currentEntry.textContent = lastEntry;
          this.entryReset = false;
        } else if (lastEntry !== '.' || !currentEntry.textContent.includes('.')) {
          currentEntry.textContent += lastEntry;
        }
      }
    })
  },
  init() {
    this.handleKeys();
  }
};

App.init();