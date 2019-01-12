const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

const App = {
  languages: languages,
  renderContent() {
    const source = $('#template');
    const template = Handlebars.compile(source.html());
    const templateHTML = template({ languages: languages });
    $('main').append(templateHTML);
    this.$descriptions = $('p');
  },
  truncate() {
    this.$descriptions.each(function() {
      const $description = $(this);
      const truncatedText = $description.text().slice(0, 120) + ' ...';
      $description.text(truncatedText);
    })
  },
  handleShowMore(e) {
    const $button = $(e.target);
    const index = $button.closest('article').index('main article');

    this.$descriptions.eq(index).text(languages[index].description);
    $button.removeClass('show-more').addClass('show-less');
    $button.text('Show less');
  },
  handleShowLess(e) {
    const $button = $(e.target);
    const $article = $button.closest('article');
    const $description = $button.siblings('p')
    const truncatedText = $description.text().slice(0, 120) + ' ...';

    $description.text(truncatedText);
    $button.removeClass('show-less').addClass('show-more');
    $button.text('Show more');
  },
  bind() {
    $('button').on('click', e => {
      const action = $(e.target).attr('class');

      if (action === 'show-more') {
        this.handleShowMore(e);
      } else if (action === 'show-less') {
        this.handleShowLess(e);
      }
    });
  },
  init() {
    this.renderContent();
    this.truncate();
    this.bind();
  }
}

App.init();