/**
 * Navigation bar download button class
 * @param {module:components.PSVNavBar} navbar
 * @constructor
 * @extends module:components/buttons.PSVNavBarButton
 * @memberof module:components/buttons
 */
function PSVNavBarDownloadButton(navbar) {
  PSVNavBarButton.call(this, navbar);

  this.create();
}

PSVNavBarDownloadButton.prototype = Object.create(PSVNavBarButton.prototype);
PSVNavBarDownloadButton.prototype.constructor = PSVNavBarDownloadButton;

PSVNavBarDownloadButton.id = 'download';
PSVNavBarDownloadButton.className = 'psv-button psv-button--hover-scale psv-download-button';
PSVNavBarDownloadButton.icon = 'download.svg';

/**
 * @override
 * @description Asks the browser to download the panorama source file
 */
PSVNavBarDownloadButton.prototype._onClick = function() {
  var link = document.createElement('a');
  link.href = this.psv.config.panorama;
  link.download = this.psv.config.panorama;
  this.psv.container.appendChild(link);
  link.click();
};
