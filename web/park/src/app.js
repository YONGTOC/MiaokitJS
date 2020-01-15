import React from 'react';
import ReactDom from 'react-dom';
import Routes from './router/router.js'
import {Provider} from 'react-redux'

ReactDom.render((
  <Routes></Routes>
), document.getElementById('root'));
