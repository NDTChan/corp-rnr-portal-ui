import React, { useState } from 'react';
import './personal.scss';
import QRCode from 'react-qr-code';
import CustomerInfo from 'app/modules/personal/information/customer-info';

const Personal = () => {
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
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
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={'nhkid'} />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              New Smart Identity Card
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={'hkid'} />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Smart Identity Card
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value={'passport'} />
            <label className="form-check-label" htmlFor="flexRadioDefault3">
              Passport
            </label>
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
            <input className="form-control" type="file" id="formFile" />
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
