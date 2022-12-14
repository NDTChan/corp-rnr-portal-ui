import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import './declaration.scss';
import { PASSPORT_DOC_TYPE } from 'app/shared/util/constants';
import { useFormContext } from 'react-hook-form';

const Declaration = () => {
  const { register, watch } = useFormContext();
  const watchDocType = watch('rpDocType', PASSPORT_DOC_TYPE);
  const showDisclaimerNoHkid = !watchDocType || watchDocType === PASSPORT_DOC_TYPE;

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
          <div className="col-sm-1 col-2">
            <input {...register('checkedNoHKID')} className="g-checkbox" name="disclaimerNoHkid" type="checkbox" required />
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
        <div className="col-sm-1 col-2">
          <input {...register('checkedOverAgeOf18')} className="g-checkbox" type="checkbox" required />
        </div>
        <div className="col-sm-11 col-10 txt-en">
          <div className="check-box-text">
            <Translate contentKey={'declaration.overAgeOf18'} />
            <span className="mandatory-star">*</span>
          </div>
        </div>
      </div>
      <div className="row well form-pd check-box-container">
        <div className="col-sm-1 col-2">
          <input {...register('checkedPrivacyStatement')} className="g-checkbox" type="checkbox" required />
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
