import React from 'react';
import './policy.scss';
import { Translate } from 'react-jhipster';

const Policy = () => {
  return (
    <>
      <div className="row policy-banner">
        <div className="col-md-12 policy-banner-content">
          <hr className={'line-separate'} />
          <br />
          <div className="row form-pd">
            <div className="col-md-auto col-2">
              <span className={'policy-step'}>D</span>
            </div>
            <div className={'col-md-auto col-10'}>
              <Translate contentKey={'policy.banner'} />
            </div>
          </div>
        </div>
      </div>
      <div className="row well policy-container">
        <div className="col-xs-12 policy-content txt-en">
          <span>
            <Translate contentKey={'policy.content'} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Policy;
