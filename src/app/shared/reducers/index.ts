import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import organisation from 'app/modules/organisation/organisation.reducer';
import permission from 'app/shared/reducers/ocr-permission';
import personal from 'app/modules/personal/personal.reducer';
import locale from './locale';

const rootReducer: ReducersMapObject = {
  personal,
  permission,
  organisation,
  locale,
  loadingBar,
};

export default rootReducer;
