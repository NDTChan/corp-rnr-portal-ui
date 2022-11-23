import './header.scss';

import React from 'react';
import { Storage, Translate } from 'react-jhipster';

import { useAppDispatch } from 'app/config/store';
import { setLocale } from 'app/shared/reducers/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { languages, locales } from 'app/config/translation';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';

export interface IHeaderProps {
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {
  const dispatch = useAppDispatch();
  const currentLocale = props.currentLocale;

  const handleLocaleChange = () => {
    let anotherLocale = undefined;
    locales.map(locale => {
      if (locale != currentLocale) {
        anotherLocale = locale;
      }
    });
    Storage.session.set('locale', anotherLocale);
    dispatch(setLocale(anotherLocale));
  };

  return (
    <div id="app-header">
      <div id="carousel1" className="carousel slide visible-md visible-lg" data-ride="carousel">
        <div className="carousel-inner">
          <div className="item active">
            <img src="content/images/header01-1O1O.jpg" alt="First slide image" className="center-block" id="carousel-img" />
          </div>
        </div>
      </div>
      <div className="btn-lang" id="lang-container">
        <button type={'button'} className={'btn btn-light'} onClick={() => handleLocaleChange()}>
          <FontAwesomeIcon icon="flag" />
          &nbsp;
          <span>{currentLocale ? languages[currentLocale].name : undefined}</span>
        </button>
      </div>
      {/*<div className="container" id="iframe-container" style={{ marginTop: '15px', textAlign: 'center' }}></div>*/}
      <div className="container" id="container">
        <div className="row form-pd header-content ">
          <div className="col-md-1 col-xs-12" />
          <div className="col-md-6 col-xs-12">
            <p style={{ padding: '20px' }}>
              <Translate contentKey={'header.thanks'} />
            </p>
          </div>
          <div className="col-md-4 col-xs-12 well note">
            <FontAwesomeIcon icon={faInfoCircle} />
            &nbsp;
            <Translate contentKey={'header.warning'} />
          </div>
          <div className="col-md-1 col-xs-12" />
        </div>
      </div>
    </div>
  );
};

export default Header;
