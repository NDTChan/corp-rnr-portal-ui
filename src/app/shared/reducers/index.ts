import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import organisationReducer from 'app/modules/organisation/organisation.reducer';
import locale from './locale';

const rootReducer: ReducersMapObject = {
  organisationReducer,
  locale,
  loadingBar,
};

export default rootReducer;
