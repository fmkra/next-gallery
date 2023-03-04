import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { jsxs, jsx } from 'react/jsx-runtime';

function useWindowWidth() {
  const [width, setWidth] = useState(null);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function Gallery({
  images,
  widths,
  ratios,
  percentVw = 100,
  margin = '2px',
  initState,
  imgLoader,
  overlay,
  spanLastRow = 0
}) {
  const [state, setState] = useState(new Array(images.length).fill(initState));
  const [sizes, width_left] = useMemo(() => {
    const sizes = [];
    const wl = [];
    for (const ratio of ratios) {
      let current_ratio = 0;
      let width_percent = [];
      for (let i = 0; i < images.length; i++) {
        if (current_ratio + images[i].aspect_ratio <= ratio) {
          current_ratio += images[i].aspect_ratio;
        } else {
          for (let j = width_percent.length; j < i; j++) {
            width_percent.push(Math.floor(images[j].aspect_ratio / current_ratio * 1000) / 10);
          }
          current_ratio = images[i].aspect_ratio;
        }
      }
      const width_left = Math.floor((1 - current_ratio / ratio) * 1000) / 10;
      const shouldSpan = 100 - width_left < spanLastRow;
      for (let i = width_percent.length; i < images.length; i++) {
        width_percent.push(Math.floor(images[i].aspect_ratio / (shouldSpan ? ratio : current_ratio) * 1000) / 10);
      }
      sizes.push(width_percent);
      wl.push(shouldSpan ? width_left : 0);
    }
    return [sizes, wl];
  }, [images, ratios, spanLastRow]);
  const width = useWindowWidth();
  const sizeLevel = useMemo(() => {
    if (width === null) return null;
    const index = widths.findIndex(value => value > width);
    return index === -1 ? ratios.length - 1 : index;
  }, [width, widths, ratios]);
  if (width == null || sizeLevel === null) return null;
  return /*#__PURE__*/jsxs("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    children: [images.map((image, index) => {
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
            sizes: widths.map((width, i) => `(max-width: ${width}px) ${percentVw / 100 * sizes[i][index]}vw`).join(', ') + `, ${percentVw / 100 * sizes[sizes.length - 1][index]}vw`
          }), overlay ? /*#__PURE__*/jsx("div", {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            },
            children: overlay(image.name, state[index], arg => {
              if (arg instanceof Function) setState(state.map((value, i) => i === index ? arg(value) : value));else setState(state.map((value, i) => i === index ? arg : value));
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
//# sourceMappingURL=index.js.map
