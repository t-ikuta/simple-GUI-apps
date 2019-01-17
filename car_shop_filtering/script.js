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
  renderCarInfo() {
    $('dl').append(this.carOptionsTemplate({cars: this.cars}));
    this.removeDuplicateOptions();
    $('main').append(this.carInfoTemplate({cars: this.cars}));
  },
  init() {
    this.renderCarInfo();
  }
};

App.init();