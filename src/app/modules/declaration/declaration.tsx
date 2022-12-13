import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import './declaration.scss';
import { useAppSelector } from 'app/config/store';
import PASSPORT_DOC_TYPE from '../../shared/util/constant';
import { setDisclaimer, setNoHKID, setPrivacyStatement } from './declaration.reducer';
import { useAppDispatch } from 'app/config/store';

const Declaration = () => {
  const docType = useAppSelector(state => state.personal.docType);
  const showDisclaimerNoHkid = docType === PASSPORT_DOC_TYPE;
  const dispatch = useAppDispatch();
  const [checkedNoHKID, setCheckedNoHKID] = useState(false);
  const [checkedDisclaimer, setCheckedDisclaimer] = useState(false);
  const [checkedPrivacyStatement, setCheckedPrivacyStatement] = useState(false);

  const handleOnChangeNoHKID = () => {
    const checked = !checkedNoHKID;
    setCheckedNoHKID(checked);
    dispatch(setNoHKID(checked));
  };
  const handleOnChangeDisclaimer = () => {
    const checked = !checkedDisclaimer;
    setCheckedDisclaimer(checked);
    dispatch(setDisclaimer(checked));
  };
  const handleOnChangePrivacyStatement = () => {
    const checked = !checkedPrivacyStatement;
    setCheckedPrivacyStatement(checked);
    dispatch(setPrivacyStatement(checked));
  };

  return (
    <>
      <div className="row declaration-banner">
        <div className="col-md-12 declaration-banner-content">
          <hr className={'line-separate'} />
          <br />
          <div className="row form-pd">
            <div className="col-md-auto col-2">
              <span className={'policy-step'}>C</span>
            </div>
            <div className={'col-md-auto col-10'}>
              <Translate contentKey={'declaration.banner'} />
            </div>
          </div>
        </div>
      </div>
      <div id="content" className="row form-pd">
        <Translate contentKey={'declaration.content'} />
      </div>
      <br />
      <div className="form-pd">
        <Translate contentKey={'declaration.confirm'} />
      </div>
      {showDisclaimerNoHkid && (
        <div className="row well form-pd check-box-container">
          <div className="col-sm-1 col-2 txt-en">
            <input
              className="g-checkbox"
              name="disclaimerNoHkid"
              type="checkbox"
              checked={checkedNoHKID}
              onChange={handleOnChangeNoHKID}
              required
            />
          </div>
          <div className="col-sm-11 col-10 txt-en">
            <div className="check-box-text" id="declaration-no-hkid">
              <Translate contentKey={'declaration.noHKID'} />
              <span className="mandatory-star">*</span>
            </div>
          </div>
        </div>
      )}
      <div className="row well form-pd check-box-container">
        <div className="col-sm-1 col-2 txt-en">
          <input className="g-checkbox" type="checkbox" checked={checkedDisclaimer} onChange={handleOnChangeDisclaimer} required />
        </div>
        <div className="col-sm-11 col-10 txt-en">
          <div className="check-box-text">
            <Translate contentKey={'declaration.disclaimer'} />
            <span className="mandatory-star">*</span>
          </div>
        </div>
      </div>
      <div className="row well form-pd check-box-container">
        <div className="col-sm-1 col-2 txt-en">
          <input
            className="g-checkbox"
            type="checkbox"
            checked={checkedPrivacyStatement}
            onChange={handleOnChangePrivacyStatement}
            required
          />
        </div>
        <div className="col-sm-11 col-10 txt-en">
          <div className="check-box-text">
            <Translate contentKey={'declaration.understoodStatement'} />
            &nbsp;
            <a href="https://www.hkt.com/privacy-statement?locale=en" target="_blank" rel="noreferrer" className="privacy-statement-link ">
              <Translate contentKey={'declaration.privacyStatement'} />
            </a>
            .<span className="mandatory-star">*</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Declaration;
