/**
 * Navigation bar markers button class
 * @param {module:components.PSVNavBar} navbar
 * @constructor
 * @extends module:components/buttons.PSVNavBarButton
 * @memberof module:components/buttons
 */
function PSVNavBarMarkersButton(navbar) {
  PSVNavBarButton.call(this, navbar);

  this.create();
}

PSVNavBarMarkersButton.prototype = Object.create(PSVNavBarButton.prototype);
PSVNavBarMarkersButton.prototype.constructor = PSVNavBarMarkersButton;

PSVNavBarMarkersButton.id = 'markers';
PSVNavBarMarkersButton.className = 'psv-button psv-button--hover-scale psv-markers-button';
PSVNavBarMarkersButton.icon = 'pin.svg';

/**
 * @override
 * @description Toggles markers list
 */
PSVNavBarMarkersButton.prototype._onClick = function() {
  this.psv.hud.toggleMarkersList();
};
