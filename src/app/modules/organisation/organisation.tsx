import './organisation.scss';
import React from 'react';

const Organisation = () => {
  return (
    <>
      <div className="row well organisation-container">
        <div className="col-xs-12 reference-content">
          <span id="refNum">Reference ID : </span>
          <span style={{ color: '#fff' }} id="pre-filled-refNum"></span>
        </div>
      </div>
      <div className="row organisation-banner">
        <div className="col-md-12 organisation-content">
          <br />
          <div className="row form-pd">
            <div className="col-md-auto col-xs-12">
              <span className={'organisation-step'}>A</span>
            </div>
            <div className={'col-md-auto col-xs-12'}> Organisation Information</div>
          </div>
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-company-name-eng-desc">
          Company Name (Eng)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-company-name-eng"></div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-branch-name-eng-desc">
          Branch Name (Eng)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-branch-name-eng"></div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-company-name-chi-desc">
          Company Name (Chi)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-company-name-chi"></div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-branch-name-chi-desc">
          Branch Name (Chi)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-branch-name-chi"></div>
      </div>
      <div className="row form-pd" id="account-number-div">
        <div className="col-md-6 col-xs-12" id="pre-filled-account-number-desc">
          Account Number
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-account-number"></div>
      </div>
      <div className="row form-pd" id="mobile-number-div">
        <div className="col-md-6 col-xs-12" id="pre-filled-reg-mobile-no-desc">
          Registration for Mobile no.
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-reg-mobile-no"></div>
      </div>
    </>
  );
};

export default Organisation;
