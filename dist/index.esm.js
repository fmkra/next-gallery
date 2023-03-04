import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { jsxs, jsx } from 'react/jsx-runtime';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function useWindowWidth() {
  var _useState = useState(null),
    width = _useState[0],
    setWidth = _useState[1];
  useEffect(function () {
    var handleResize = function handleResize() {
      return setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return width;
}

function Gallery(_ref) {
  var images = _ref.images,
    widths = _ref.widths,
    ratios = _ref.ratios,
    _ref$percentVw = _ref.percentVw,
    percentVw = _ref$percentVw === void 0 ? 100 : _ref$percentVw,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? '2px' : _ref$margin,
    initState = _ref.initState,
    imgLoader = _ref.imgLoader,
    overlay = _ref.overlay,
    _ref$spanLastRow = _ref.spanLastRow,
    spanLastRow = _ref$spanLastRow === void 0 ? 0 : _ref$spanLastRow;
  var _useState = useState(new Array(images.length).fill(initState)),
    state = _useState[0],
    setState = _useState[1];
  var _useMemo = useMemo(function () {
      var sizes = [];
      var wl = [];
      for (var _iterator = _createForOfIteratorHelperLoose(ratios), _step; !(_step = _iterator()).done;) {
        var ratio = _step.value;
        var current_ratio = 0;
        var width_percent = [];
        for (var i = 0; i < images.length; i++) {
          if (current_ratio + images[i].aspect_ratio <= ratio) {
            current_ratio += images[i].aspect_ratio;
          } else {
            for (var j = width_percent.length; j < i; j++) {
              width_percent.push(Math.floor(images[j].aspect_ratio / current_ratio * 1000) / 10);
            }
            current_ratio = images[i].aspect_ratio;
          }
        }
        var _width_left = Math.floor((1 - current_ratio / ratio) * 1000) / 10;
        var shouldSpan = 100 - _width_left < spanLastRow;
        for (var _i = width_percent.length; _i < images.length; _i++) {
          width_percent.push(Math.floor(images[_i].aspect_ratio / (shouldSpan ? ratio : current_ratio) * 1000) / 10);
        }
        sizes.push(width_percent);
        wl.push(shouldSpan ? _width_left : 0);
      }
      return [sizes, wl];
    }, [images, ratios, spanLastRow]),
    sizes = _useMemo[0],
    width_left = _useMemo[1];
  var width = useWindowWidth();
  var sizeLevel = useMemo(function () {
    if (width === null) return null;
    var index = widths.findIndex(function (value) {
      return value > width;
    });
    return index === -1 ? ratios.length - 1 : index;
  }, [width, widths, ratios]);
  if (width == null || sizeLevel === null) return null;
  return /*#__PURE__*/jsxs("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    children: [images.map(function (image, index) {
      var _image$alt;
      return /*#__PURE__*/jsx("div", {
        style: {
          boxSizing: 'border-box',
          width: sizes[sizeLevel][index] + '%',
          flexShrink: 0,
          flexGrow: 1,
          position: 'relative',
          paddingBottom: sizes[sizeLevel][index] / image.aspect_ratio + '%'
        },
        children: /*#__PURE__*/jsxs("div", {
          style: {
            position: 'absolute',
            top: margin,
            left: margin,
            right: margin,
            bottom: margin
          },
          children: [/*#__PURE__*/jsx(Image, {
            src: image.src,
            alt: (_image$alt = image.alt) != null ? _image$alt : '',
            fill: true,
            loader: imgLoader,
            sizes: widths.map(function (width, i) {
              return "(max-width: " + width + "px) " + percentVw / 100 * sizes[i][index] + "vw";
            }).join(', ') + (", " + percentVw / 100 * sizes[sizes.length - 1][index] + "vw")
          }), overlay ? /*#__PURE__*/jsx("div", {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            },
            children: overlay(image.name, state[index], function (arg) {
              if (arg instanceof Function) setState(state.map(function (value, i) {
                return i === index ? arg(value) : value;
              }));else setState(state.map(function (value, i) {
                return i === index ? arg : value;
              }));
            })
          }) : null]
        })
      }, index);
    }), /*#__PURE__*/jsx("div", {
      style: {
        width: width_left[sizeLevel] + '%',
        flexShrink: 0,
        flexGrow: 1
      }
    })]
  });
}

export { Gallery };
//# sourceMappingURL=index.esm.js.map
