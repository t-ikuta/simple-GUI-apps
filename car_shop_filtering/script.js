const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

const App = {
  $form: $('form'),
  cars: cars,
  carInfoTemplate: Handlebars.compile($('#car_info_template').html()),
  carInfoTemplatePartial: Handlebars.registerPartial('car', $('#car_info_template_partial').html()),
  carOptionsTemplate: Handlebars.compile($('#car_options_template').html()),
  removeDuplicateOptions() {
    const keys = Object.keys(this.cars[0]);
    let usedOptions = [];

    keys.forEach(key => {
      const $options = $(`#${key} option`);
      $options.each(function() {
        const optionValue = $(this).text();
        if (usedOptions.includes(optionValue)) {
          $(this).remove();
        } else {
          usedOptions.push(optionValue);          
        }
      })

      usedOptions = [];
    })
    
  },
  renderCarOptions() {
    $('dl').append(this.carOptionsTemplate({cars: this.cars}));
    this.removeDuplicateOptions();
  },
  renderCarInfo() {
    $('main').html(this.carInfoTemplate({cars: this.cars}));
  },
  renderCarOptionsAndInfo() {
    this.renderCarOptions();
    this.renderCarInfo();
  },
  stringToJSON(string) {
    const json = {};
    const arr = string.split('&').map(el => el.split('='));
    arr.forEach(el => {
      const key = el[0];
      let value = el[1];

      // convert year/price to integer
      if (['year', 'price'].includes(key)) value = +value;

      if (value) json[key] = value;
    });

    return json;
  },
  // isSearchedCar(car, criteria) {
  //   return (criteria.make === 'All' || criteria.make === car.make) &&
  //          (criteria.model === 'All' || criteria.model === car.model) &&
  //          (criteria.year === 'Any' || Number(criteria.year) === car.year) &&
  //          (criteria.price === 'Any' || Number(criteria.price) === car.price);
  // },
  // filterCarInfo(json) {
  //   const $carInfo = $('.car_info');
  //   this.cars = cars.filter(car => this.isSearchedCar(car, json));

  //   this.renderCarInfo();
  // },
  filterCarInfo(json) {
    const $carInfo = $('.car_info');
    this.cars = _.where(cars, json);

    this.renderCarInfo();
  },
  handleFilter() {
    this.$form.on('submit', e => {
      e.preventDefault();
      const formString = $(e.target).serialize();
      const formJSON = this.stringToJSON(formString);

      this.filterCarInfo(formJSON);
    });
  },
  init() {
    this.renderCarOptionsAndInfo();
    this.handleFilter();
  }
};

App.init();