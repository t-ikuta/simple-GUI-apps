const App = {
  $entry: $('.entry'),
  $operation: $('.operation'),
  result: 0,
  operations: [],
  entryReset: true,
  isInitialEntry: true,
  updateOperation(operationType, currentEntry, currentOperation) {
    switch (operationType) {
      case 'c':
        currentOperation.textContent = '';
        break;
      case '/':
        currentOperation.textContent += `${currentEntry.textContent} ÷ `;
        break;
      case '*':
        currentOperation.textContent += `${currentEntry.textContent} x `;
        break;
      case '+':
        currentOperation.textContent += `${currentEntry.textContent} + `;
        break;
      case '-':
        currentOperation.textContent += `${currentEntry.textContent} - `;
        break;
    }
    
    this.operations.push(operationType);
  },
  updateResult(prevOperation, currentEntry, currentOperation) {
    console.log(currentEntry, currentOperation);
    if (prevOperation) {
      switch(prevOperation) {
        case 'c':
          this.result = 0;
          break;
        case 'neg':
          this.result = -this.result;
          break;
        case '/':
          this.result /= +currentEntry.textContent;
          break;
        case '*':
          this.result *= +currentEntry.textContent;
          break;
        case '+':
          this.result += +currentEntry.textContent;
          break;
        case '-':
          this.result -= +currentEntry.textContent;
          break;
        case '%':
          this.result %= +currentEntry.textContent;
          break;
      }
    } else {
      this.result = +currentEntry.textContent;
    }

    console.log(this.result);
  },
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
      case '=':
        this.$operation.text('');
        this.$entry.text(this.result);
        break;
      default:
        this.$entry.text(this.result);
    }

    // currentEntry.textContent = this.result;
  },
  handleKeys() {
    $('.keys').on('click', 'span', e => {
      const $key = $(e.target);
      const operationType = $key.attr('data-operation');
      const currentEntry = this.$entry[0];
      const lastEntry = $key.text();
      const currentOperation = this.$operation[0];
      const prevOperation = this.operations[this.operations.length - 1];

      if (operationType) {
        this.updateResult(prevOperation, currentEntry, currentOperation);
        this.updateOperation(operationType, currentEntry, currentOperation);
        this.updateEntry(operationType, currentEntry);
        this.entryReset = true;
      } else {
        // Non-operations (i.e. numbers) entered. Only entry is updated.
        if (this.entryReset) {
          // update entry
          currentEntry.textContent = lastEntry;
          if (this.isInitialEntry) this.isInitialEntry = false;

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