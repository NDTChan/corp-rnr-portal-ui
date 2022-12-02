import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import organisation from 'app/modules/organisation/organisation.reducer';
import ocrPermission from 'app/shared/reducers/ocr-permission';
import locale from './locale';

const rootReducer: ReducersMapObject = {
  ocrPermission,
  organisation,
  locale,
  loadingBar,
};

export default rootReducer;
