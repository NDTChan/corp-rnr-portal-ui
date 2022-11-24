import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';

const Footer = () => (
  <div id="app-footer" className="footer-container">
    <div className="primary-footer">
      <br />
      <div className="container">
        <div className="text-light align-center">
          <h4 className="font-size-18px">
            <Translate contentKey={'footer.findUs'} />
          </h4>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <a target="_blank" href="https://1010corporate.com/">
            <img src="content/images/icon-1O1O.png" alt="" width="40" />
          </a>
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href="https://www.facebook.com/1O1OBusinessSolutions/">
            <img src="content/images/icon-FB.png" alt="" width="40" />
          </a>
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href="https://www.linkedin.com/company/1o1o-corporate-solutions">
            <img src="content/images/icon-Linked.png" alt="" width="40" />
          </a>
          &nbsp;&nbsp;&nbsp;
          <a target="_blank" href="https://www.youtube.com/channel/UCOSoJi0TzFcTGtQxksKRS9Q">
            <img src="content/images/icon-Youtube.png" alt="" width="40" />
          </a>
        </div>
      </div>
    </div>
    <div className="secondary-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 align-center align-center">
            <span className="m-top-10 font-size-70">
              <Translate contentKey={'footer.csl'} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Footer;
