import languageSelectTemplate from './language-select.html';


class languageSelectController {

  constructor(Config, $cookies, $translate) {
    'ngInject';
    this.languages = Config.languages;

    this.$cookies = $cookies;
    this.$translate = $translate;
  }

  $onInit() {
    this.language = this.$translate.use();
  }

  update() {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 365);
    this.$cookies.put('language', this.language, {expires: expireDate});
    this.$translate.use(this.language);
  }

}

export default {
  template: languageSelectTemplate,
  controller: languageSelectController
};
