import React from 'react';
import { Translate } from "react-jhipster";

const Footer = () => (
  <div id="app-footer" style={{ color: "#fff", backgroundColor: "#474747" }}>
    <div className="primary-footer">
      <div className="container">
        <div className="row form-pd">
          <div className="col-md-12">
            <table style={{ border: "0" }} cellPadding="5" cellSpacing="5" width="100%">
              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <h4>
                      <span className="text-light">
                        <Translate contentKey={"footer.findUs"} />
                        <br />
                        <br />
                      </span>
                    </h4>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <a target="_blank" href="https://1010corporate.com/">
                      <img src="content/images/icon-1O1O.png" alt="" width="40" />
                    </a>
                    &nbsp;
                    <a target="_blank" href="https://www.facebook.com/1O1OBusinessSolutions/">
                      <img src="content/images/icon-FB.png" alt="" width="40" />
                    </a>
                    &nbsp;
                    <a target="_blank" href="https://www.linkedin.com/company/1o1o-corporate-solutions">
                      <img src="content/images/icon-Linked.png" alt="" width="40" />
                    </a>
                    &nbsp;
                    <a target="_blank" href="https://www.youtube.com/channel/UCOSoJi0TzFcTGtQxksKRS9Q">
                      <img src="content/images/icon-Youtube.png" alt="" width="40" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div className="secondary-footer" style={{ padding: "50px 0px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{ textAlign: "center" }}>
            <span className="m-top-10" style={{ fontSize: "70%" }}>
              <Translate contentKey={"footer.csl"} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default Footer;
