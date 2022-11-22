import "./header.scss";

import React from "react";
import { Storage } from "react-jhipster";

import { useAppDispatch } from "app/config/store";
import { setLocale } from "app/shared/reducers/locale";
import { LocaleMenu } from "app/shared/layout/menus/locale";

export interface IHeaderProps {
  currentLocale: string;
}

const Header = (props: IHeaderProps) => {

  const dispatch = useAppDispatch();

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set("locale", langKey);
    dispatch(setLocale(langKey));
  };

  return (
    <div id="app-header">
      <div
        id="carousel1"
        className="carousel slide visible-md visible-lg"
        data-ride="carousel"
      >
        <div className="carousel-inner" role="listbox">
          <div className="item active">
            <img
              src="content/images/header01-1O1O.jpg"
              alt="First slide image"
              className="center-block"
              id="carousel-img"
            />
          </div>
        </div>
      </div>
      <div className="btn-lang" id="lang-container">
        <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
      </div>
      <div
        className="container"
        id="iframe-container"
        style={{ marginTop: "15px", textAlign: "center" }}
      ></div>
    </div>
  );
};

export default Header;
