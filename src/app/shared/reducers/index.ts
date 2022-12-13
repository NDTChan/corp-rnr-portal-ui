import { ReducersMapObject } from '@reduxjs/toolkit';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import organisation from 'app/modules/organisation/organisation.reducer';
import personal from 'app/modules/personal/personal.reducer';
import ocrPermission from 'app/shared/reducers/ocr-permission';
import declaration from 'app/modules/declaration/declaration.reducer';
import locale from './locale';

const rootReducer: ReducersMapObject = {
  ocrPermission,
  personal,
  organisation,
  declaration,
  locale,
  loadingBar,
};

export default rootReducer;
