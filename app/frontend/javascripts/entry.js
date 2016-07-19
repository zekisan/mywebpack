'use strict';

import $ from 'jquery';
require('expose?$!expose?jQuery!jquery');

require('../stylesheets/application.less');
require('bootstrap');

var _ = require('lodash');
_.times(5, function(i) {
  console.log(i);
});

alert('oi3');

require('react');
import React from 'react';
import ReactDOM from 'react-dom';

import * as OurComponents from './components';

$.fn.initPlugins = function() {
  const scope = $(this);

  // react components
  $('[data-react-class]', scope).each(function() {
    const $node     = $(this),
          className = $node.data('reactClass');

    // Assume className is simple and can be found at top-level (global) or in ./components/index.js.
    let constructor = global[className] || OurComponents[className];

    // Hack to support ES6
    if (constructor.__esModule && constructor.default)
      constructor = constructor.default;
    const props = $node.data('reactProps');

    ReactDOM.render(React.createElement(constructor, props), this);
  });
  
  return this;
};


$(function() {
  const $body = $('body');

  $body.initPlugins();
});