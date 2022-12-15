import React from 'react';
import './personal.scss';
import QRCode from 'react-qr-code';
import CustomerInfo from 'app/modules/personal/information/customer-info';
import { useFormContext } from 'react-hook-form';
import { getParamStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getFieUploadInfo } from 'app/modules/personal/personal.reducer';
import _ from 'lodash';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { DOC_TYPE } from 'app/config/constants';

const Personal = () => {
  const dispatch = useAppDispatch();
  const [showCustomerInfo, setShowCustomerInfo] = React.useState(false);
  const {
    register,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const watchDocType = watch('rpDocType');

  const isFetching = useAppSelector(state => state.personal.loading);
  const isUploadSuccess = useAppSelector(state => state.personal.uploaded);

  React.useEffect(() => {
    _.isBoolean(isFetching) && isFetching ? dispatch(showLoading()) : dispatch(hideLoading());
    setShowCustomerInfo(isUploadSuccess);
  }, [isFetching]);

  React.useEffect(() => {
    setShowCustomerInfo(false);
  }, [watchDocType]);

  const onChangeFile = e => {
    const isFileExist = e.target.files && e.target.files.length;
    if (isFileExist) {
      const file = e.target.files[0];
      getBase64(file).then(result => {
        const formData = new FormData();
        formData.append('rnrToken', getParamStateWithQueryParams('token', location.search));
        formData.append('docType', getValues('rpDocType'));
        formData.append('frontPageImage', result as string);
        dispatch(getFieUploadInfo(formData));
      });
    }
  };

  const getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  return (
    <>
      <div className="row personal-banner">
        <div className="col-md-12 personal-content">
          <hr className={'line-separate'} />
          <br />
          <div className="row form-pd">
            <div className="col-md-auto col-xs-12">
              <span className={'personal-step'}>B</span>
            </div>
            <div className={'col-md-auto col-xs-12'}> Personal Information of Responsible Person</div>
          </div>
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-12 mandatory-field text-right">
          (<span className="mandatory-star">*</span>
          <span id="mandatory-desc">Mandatory field</span>)<br />
        </div>
      </div>

      <div className="row form-pd">
        <div className="col-md-6 col-xs-12">
          <span id="id-passport-type">Select identity document:</span>
          <span className="mandatory-star">*</span>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="form-check">
            <input {...register('rpDocType')} type="radio" name="rpDocType" id="flexRadioDefault1" value={DOC_TYPE.NEW_HKID} />
            <span className="checkbox-label">New Smart Identity Card</span>
          </div>
          <div className="form-check">
            <input {...register('rpDocType')} type="radio" name="rpDocType" id="flexRadioDefault2" value={DOC_TYPE.OLD_HKID} />
            <span className="checkbox-label">Smart Identity Card</span>
          </div>
          <div className="form-check">
            <input {...register('rpDocType')} type="radio" name="rpDocType" id="flexRadioDefault3" value={DOC_TYPE.PASSPORT} />
            <span className="checkbox-label">Passport</span>
          </div>
        </div>
      </div>
      {/*<div id="mobile-take-photo-container" className="row form-pd" hidden>*/}
      {/*  <div className="col-md-6 col-xs-12"></div>*/}
      {/*  <div className="col-md-6 col-xs-12">*/}
      {/*    <button type="button" className="btn btn-default take-photo" id="mobile-take-photo" name="mobile-take-photo" disabled>*/}
      {/*      Take Photo*/}
      {/*    </button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div id="choose-file-container" className="row form-pd">
        <div className="col-md-6 col-xs-12 line-height-left-1">
          <span id="upload-id-desc">Upload Identity Document Copy</span>
          <span className="mandatory-star">*</span>
        </div>
        <div className="col-md-6 col-xs-12 line-height-left-1-2">
          <p style={{ fontSize: '90%' }} id="upload-id-qrcode-desc">
            To process the Real-Name Registration with enhanced experience with your mobile device.
          </p>
          <p style={{ textAlign: 'center' }} id="qrcode-container">
            <QRCode size={200} value={window.location.href} viewBox={`0 0 200 200`} />
          </p>
          <br />
          <h2>
            <span id="upload-id-or">Or</span>
          </h2>
          <div className="document-container">
            <input {...register('file')} onChange={onChangeFile} className="form-control" type="file" id="formFile" />
          </div>

          <br />
          <span style={{ fontSize: '75%', fontStyle: 'italic' }} id="document-upload-guide">
            File type: JPG
            <br />
            File size not over 5MB
            <br />
            Do not use Black-and-white picture
            <br />
            Suggest using the photo instead of scanning the identity document by scanner
          </span>
        </div>
      </div>
      {showCustomerInfo && <CustomerInfo />}
    </>
  );
};

export default Personal;
