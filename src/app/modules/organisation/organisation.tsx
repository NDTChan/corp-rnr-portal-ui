import './organisation.scss';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getPayload } from './organisation.reducer';
import _ from 'lodash';

const Organisation = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPayload());
  }, []);
  const payload = useAppSelector(state => state.organisationReducer.data);
  const { orderInfo, orgInfo, rnrInfo } = payload.cordPayload;
  const rnrLevel = rnrInfo.rnrLevel;
  const planType = orderInfo.planType;

  const isAllowBinding = !_.isNull(rnrLevel) && !_.isNull(planType) && !_.isEmpty(rnrLevel) && !_.isEmpty(planType);

  return (
    <>
      <div className="row well organisation-container">
        <div className="col-xs-12 reference-content">
          <span id="refNum">Reference ID : </span>
          <span style={{ color: '#fff' }} id="pre-filled-refNum">
            {isAllowBinding ? orderInfo.orderId : ''}
          </span>
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
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-company-name-eng">
          {isAllowBinding ? orgInfo.companyNameEng : ''}
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-branch-name-eng-desc">
          Branch Name (Eng)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-branch-name-eng">
          {isAllowBinding ? orgInfo.branchNameEng : ''}
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-company-name-chi-desc">
          Company Name (Chi)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-company-name-chi">
          {isAllowBinding ? orgInfo.companyNameChi : ''}
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12" id="pre-filled-branch-name-chi-desc">
          Branch Name (Chi)
        </div>
        <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-branch-name-chi">
          {isAllowBinding ? orgInfo.branchNameChi : ''}
        </div>
      </div>
      {isAllowBinding && _.isEqual(planType, 'CES') && _.includes(['ACCT', 'MRT'], rnrLevel) && _.isArray(rnrInfo.accountNo) ? (
        <div className="row form-pd" id="account-number-div">
          <div className="col-md-6 col-xs-12" id="pre-filled-account-number-desc">
            Account Number
          </div>
          <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-account-number">
            {_.join(rnrInfo.accountNo, ',')}
          </div>
        </div>
      ) : (
        <></>
      )}
      {isAllowBinding && _.isEqual(rnrLevel, 'MRT') && _.isArray(rnrInfo.mrt) ? (
        <div className="row form-pd" id="mobile-number-div">
          <div className="col-md-6 col-xs-12" id="pre-filled-reg-mobile-no-desc">
            Registration for Mobile no.
          </div>
          <div className="col-md-6 col-xs-12 bold-text-600" id="pre-filled-reg-mobile-no">
            {_.join(rnrInfo.mrt, ',')}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Organisation;
