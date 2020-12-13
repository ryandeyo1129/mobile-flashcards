import thunk from 'redux-thunk';
import logger from './logger';
import { applyMiddleware, compose } from 'redux';

export default compose(applyMiddleware(
  thunk,
  logger
),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)