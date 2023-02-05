import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { jsx, jsxs } from 'react/jsx-runtime';

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
    overlay = _ref.overlay;
  var _useState = useState(new Array(images.length).fill(initState)),
    state = _useState[0],
    setState = _useState[1];
  var sizes = useMemo(function () {
    return ratios.map(function (ratio) {
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
      for (var _i = width_percent.length; _i < images.length; _i++) {
        width_percent.push(Math.floor(images[_i].aspect_ratio / current_ratio * 1000) / 10);
      }
      return width_percent;
    });
  }, [images, ratios]);
  var width = useWindowWidth();
  var sizeLevel = useMemo(function () {
    if (width === null) return null;
    var index = widths.findIndex(function (value) {
      return value > width;
    });
    return index === -1 ? ratios.length - 1 : index;
  }, [width, widths, ratios]);
  if (width == null || sizeLevel === null) return null;
  return /*#__PURE__*/jsx("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    children: images.map(function (image, index) {
      var _image$alt;
      return /*#__PURE__*/jsx("div", {
        style: {
          boxSizing: 'border-box',
          width: sizes[index] + '%',
          flexShrink: 0,
          flexGrow: 1,
          aspectRatio: image.aspect_ratio,
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
    })
  });
}

export { Gallery };
//# sourceMappingURL=index.esm.js.map
