'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _swiper = require('swiper');

var _swiper2 = _interopRequireDefault(_swiper);

require('swiper/dist/css/swiper.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSwiper = function (_Component) {
  _inherits(ReactSwiper, _Component);

  //可能需要传入的参数
  function ReactSwiper(props) {
    _classCallCheck(this, ReactSwiper);

    var _this = _possibleConstructorReturn(this, (ReactSwiper.__proto__ || Object.getPrototypeOf(ReactSwiper)).call(this, props));

    _this.currentSwiper = null;
    return _this;
  }

  _createClass(ReactSwiper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSwiper();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateSwiper();
    }
  }, {
    key: 'getSwiper',
    value: function getSwiper() {
      return this.currentSwiper;
    }
  }, {
    key: 'clearSwiper',
    value: function clearSwiper() {
      if (this.currentSwiper) {
        this.currentSwiper.destroy();
        this.currentSwiper = null;
      }
    }
  }, {
    key: 'updateSwiper',
    value: function updateSwiper() {
      var swiper = this.getSwiper();
      if (swiper) {
        this.clearSwiper();
      }
      var _props = this.props,
          showPagination = _props.showPagination,
          options = _props.options;
      var swiperContainer = this.refs.swiperContainer;


      var swiperOptions = showPagination ? {
        pagination: '.swiper-pagination'
      } : {};

      var currentSwiper = new _swiper2.default(swiperContainer, _extends({}, options, swiperOptions));

      this.currentSwiper = currentSwiper;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          items = _props2.items,
          showPagination = _props2.showPagination,
          className = _props2.className;


      return _react2.default.createElement(
        'div',
        { className: 'swiper-container ' + className, ref: 'swiperContainer' },
        _react2.default.createElement(
          'div',
          { className: 'swiper-wrapper' },
          items && items.map(function (item) {
            var image = item.image,
                link = item.link,
                title = item.title;

            return _react2.default.createElement(
              'div',
              { className: 'slider-item swiper-slide', key: image },
              _react2.default.createElement(
                'div',
                { className: 'slide-content' },
                link ? _react2.default.createElement(
                  'a',
                  { href: link },
                  _react2.default.createElement('img', { className: 'swiper-img', src: image, title: title })
                ) : _react2.default.createElement('img', { className: 'swiper-img', src: image, title: title })
              )
            );
          })
        ),
        showPagination ? _react2.default.createElement('div', { className: 'swiper-pagination' }) : null
      );
    }
  }]);

  return ReactSwiper;
}(_react.Component);

ReactSwiper.propTypes = {
  className: _propTypes2.default.string, // 自定义 className
  showPagination: _propTypes2.default.bool, // 是否显示分页按钮
  options: _propTypes2.default.object, // swiper 选项
  items: _propTypes2.default.array // 轮播图记录数
};
ReactSwiper.defaultProps = {
  className: '',
  showPagination: false,
  nextButton: null,
  prevButton: null,
  scrollbar: null,
  options: {
    autoplay: 3000,
    speed: 400,
    loop: true,
    spaceBetween: 100
  }
};
exports.default = ReactSwiper;