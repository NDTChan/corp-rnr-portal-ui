import React from 'react';
import { Translate } from 'react-jhipster';
import './declaration.scss';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';
import { DOC_TYPE } from 'app/config/constants';
import { SingleErrorMessage } from 'app/shared/error/error-validation';

const Declaration = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();
  const docType = getValues('rpDocType');

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
      {_.isEqual(docType, DOC_TYPE.PASSPORT) && (
        <>
          <div className="row well form-pd check-box-container">
            <div className="col-sm-1 col-2">
              <input {...register('disclaimerNoHkid')} className="g-checkbox" name="disclaimerNoHkid" type="checkbox" />
            </div>
            <div className="col-sm-11 col-10 txt-en">
              <div className="check-box-text" id="declaration-no-hkid">
                <Translate contentKey={'declaration.noHKID'} />
                <span className="mandatory-star">*</span>
              </div>
            </div>
          </div>
          <SingleErrorMessage name={'disclaimerNoHkid'} errors={errors} />
        </>
      )}
      <div className="row well form-pd check-box-container">
        <div className="col-sm-1 col-2">
          <input {...register('disclaimerOverAgeOf18')} className="g-checkbox" type="checkbox" />
        </div>
        <div className="col-sm-11 col-10 txt-en">
          <div className="check-box-text">
            <Translate contentKey={'declaration.overAgeOf18'} />
            <span className="mandatory-star">*</span>
          </div>
        </div>
      </div>
      <SingleErrorMessage name={'disclaimerOverAgeOf18'} errors={errors} />
      <div className="row well form-pd check-box-container">
        <div className="col-sm-1 col-2">
          <input {...register('disclaimerPrivacyStatement')} className="g-checkbox" type="checkbox" />
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
      <SingleErrorMessage errors={errors} name={'disclaimerPrivacyStatement'}></SingleErrorMessage>
    </>
  );
};

export default Declaration;
