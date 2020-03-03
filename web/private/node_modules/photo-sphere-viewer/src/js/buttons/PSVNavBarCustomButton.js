/**
 * Navigation bar custom button class
 * @param {module:components.PSVNavBar} navbar
 * @param {Object} config
 * @param {string} [config.id]
 * @param {string} [config.className]
 * @param {string} [config.title]
 * @param {string} [config.content]
 * @param {function} [config.onClick]
 * @param {boolean} [config.enabled=true]
 * @param {boolean} [config.visible=true]
 * @constructor
 * @extends module:components/buttons.PSVNavBarButton
 * @memberof module:components/buttons
 */
function PSVNavBarCustomButton(navbar, config) {
  PSVNavBarButton.call(this, navbar);

  /**
   * @member {Object}
   * @readonly
   * @private
   */
  this.config = config;

  if (this.config.id) {
    this.id = this.config.id;
  }

  this.create();
}

PSVNavBarCustomButton.prototype = Object.create(PSVNavBarButton.prototype);
PSVNavBarCustomButton.prototype.constructor = PSVNavBarCustomButton;

PSVNavBarCustomButton.className = 'psv-button psv-custom-button';

/**
 * @override
 */
PSVNavBarCustomButton.prototype.create = function() {
  PSVNavBarButton.prototype.create.call(this);

  if (this.config.className) {
    PSVUtils.addClasses(this.container, this.config.className);
  }

  if (this.config.title) {
    this.container.title = this.config.title;
  }

  if (this.config.content) {
    this.container.innerHTML = this.config.content;
  }

  if (this.config.enabled === false || this.config.disabled === true) {
    this.disable();
  }

  if (this.config.visible === false || this.config.hidden === true) {
    this.hide();
  }
};

/**
 * @override
 */
PSVNavBarCustomButton.prototype.destroy = function() {
  delete this.config;

  PSVNavBarButton.prototype.destroy.call(this);
};

/**
 * @override
 * @description Calls user method
 */
PSVNavBarCustomButton.prototype._onClick = function() {
  if (this.config.onClick) {
    this.config.onClick.apply(this.psv);
  }
};
