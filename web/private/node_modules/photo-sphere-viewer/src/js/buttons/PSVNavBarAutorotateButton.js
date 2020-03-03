/**
 * Navigation bar autorotate button class
 * @param {module:components.PSVNavBar} navbar
 * @constructor
 * @extends module:components/buttons.PSVNavBarButton
 * @memberof module:components/buttons
 */
function PSVNavBarAutorotateButton(navbar) {
  PSVNavBarButton.call(this, navbar);

  this.create();
}

PSVNavBarAutorotateButton.prototype = Object.create(PSVNavBarButton.prototype);
PSVNavBarAutorotateButton.prototype.constructor = PSVNavBarAutorotateButton;

PSVNavBarAutorotateButton.id = 'autorotate';
PSVNavBarAutorotateButton.className = 'psv-button psv-button--hover-scale psv-autorotate-button';
PSVNavBarAutorotateButton.icon = 'play.svg';
PSVNavBarAutorotateButton.iconActive = 'play-active.svg';

/**
 * @override
 */
PSVNavBarAutorotateButton.prototype.create = function() {
  PSVNavBarButton.prototype.create.call(this);

  this.psv.on('autorotate', this);
};

/**
 * @override
 */
PSVNavBarAutorotateButton.prototype.destroy = function() {
  this.psv.off('autorotate', this);

  PSVNavBarButton.prototype.destroy.call(this);
};

/**
 * @summary Handles events
 * @param {Event} e
 * @private
 */
PSVNavBarAutorotateButton.prototype.handleEvent = function(e) {
  switch (e.type) {
    // @formatter:off
    case 'autorotate': this.toggleActive(e.args[0]); break;
    // @formatter:on
  }
};

/**
 * @override
 * @description Toggles autorotate
 */
PSVNavBarAutorotateButton.prototype._onClick = function() {
  this.psv.toggleAutorotate();
};
