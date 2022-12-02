import React from 'react';
import './customer-info.scss';
import { Input } from 'reactstrap';

const CustomerInfo = () => {
  return (
    <>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12 align-left">
          <span id="name-on-id-eng-desc">Name on Identity Document (Eng)</span>
          <span className="mandatory-star">*</span>
        </div>
        <div className="col-md-6 col-xs-12 align-left">
          <span style={{ fontSize: '90%' }} id="form-label-last-name">
            Last Name
          </span>
          <br />
          <Input name="rpFamilyNameEng" type="text" id="rpFamilyNameEng" style={{ width: '100%' }} maxLength={50} required />
          <br />
          <span style={{ fontSize: '90%' }} id="form-label-given-name">
            Given Name
          </span>
          <br />
          <Input name="rpGivenNameEng" type="text" id="rpGivenNameEng" style={{ width: '100%' }} maxLength={50} required />
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12">
          <span id="name-on-id-chi-desc">Name on Identity Document (Chi)</span>
          <span className="mandatory-star">*</span>
        </div>
        <div className="col-md-6 col-xs-12">
          <span style={{ fontSize: '90%' }} id="form-label-chi-last-name">
            Last Name
          </span>
          <br />
          <Input
            className="chiName-group"
            name="rpFamilyNameChi"
            type="text"
            id="rpFamilyNameChi"
            style={{ width: '100%' }}
            maxLength={50}
          />
          <br />
          <span style={{ fontSize: '90%' }} id="form-label-chi-given-name">
            Given Name
          </span>
          <br />
          <Input className="chiName-group" name="rpGivenNameChi" type="text" id="rpGivenNameChi" style={{ width: '100%' }} maxLength={50} />
          <br />
          <label>
            <table width="100%" border={0} cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td width="5%">
                    <Input
                      className="g-checkbox noChineseName chiName-group"
                      name="disclaimerNoChineseName"
                      type="checkbox"
                      value="Y"
                      id="disclaimerNoChineseName"
                    />
                  </td>
                  <td className={'not-chinese-tick-box'} id="form-label-no-chinese-name-checkbox-desc">
                    I do not have any Chinese name shown on my identity document.
                  </td>
                </tr>
              </tbody>
            </table>
          </label>
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12 align-left">
          <span id="id-passport-desc">Hong Kong Identity Card/ Passport No.</span>
          <span className="mandatory-star">*</span>
        </div>
        <div className="col-md-6 col-xs-12 align-left">
          <div className="hkid nhkid box">
            <span id="form-label-hkid">Hong Kong Identity Card</span>
            <br />
            <Input
              name="rpID1"
              type="text"
              id="rpID1"
              size={4}
              maxLength={2}
              style={{ fontWeight: 'normal', width: '10%', display: 'inline' }}
            />
            &nbsp;
            <Input
              name="rpID2"
              type="text"
              id="rpID2"
              size={12}
              maxLength={6}
              style={{ fontWeight: 'normal', width: '20%', display: 'inline' }}
            />
            &nbsp;
            <Input
              name="rpID3"
              type="text"
              id="rpID3"
              size={4}
              maxLength={1}
              style={{ fontWeight: 'normal', width: '10%', display: 'inline' }}
            />
            {/*<Label>*/}
            {/*  <Input name="rpID1" type="text" id="rpID1" size={4} maxLength={2} style={{ fontWeight: 'normal' }} />*/}
            {/*  <Input name="rpID2" type="text" id="rpID2" size={12} maxLength={6} style={{ fontWeight: 'normal' }} />*/}
            {/*  (*/}
            {/*  <Input name="rpID3" type="text" id="rpID3" size={4} maxLength={1} style={{ fontWeight: 'normal' }} />*/}
            {/*  )<br />*/}
            {/*</Label>*/}
            <br />
            <br />
            <span id="form-label-hkid-guide">Example : X123456(A)</span>
          </div>
          {/*<div className="passport box">*/}
          {/*  <span id="form-label-passport-no">Passport No.</span>*/}
          {/*  <br />*/}
          {/*  <Input name="rpPassport" type="text" maxLength={50} id="rpPassport" style={{ width: '100%' }} />*/}
          {/*</div>*/}
        </div>
      </div>
      <div className="row form-pd">
        <div className="col-md-6 col-xs-12 align-left">
          <span id="dob-desc">Date of Birth</span>
          <span className="mandatory-star">*</span>
          <br />
          <span id="dob-format-desc">(DD/MM/YYYY)</span>
        </div>
        <div className="col-md-6 col-xs-12 align-left">
          <label>
            <table width="50%" border={0} cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td valign="top">
                    <select
                      name="rpDobD"
                      size={1}
                      required={true}
                      className="form-control"
                      style={{ width: '80px', fontWeight: 'normal' }}
                      id="rpDobD"
                    >
                      <option value="">Day</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                  </td>
                  <td valign="top">&nbsp;&nbsp;/&nbsp;&nbsp;</td>
                  <td valign="top">
                    <select
                      name="rpDobM"
                      required={true}
                      className="form-control"
                      style={{ width: '90px', fontWeight: 'normal' }}
                      id="rpDobM"
                    >
                      <option value="">Month</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </td>
                  <td valign="top">&nbsp;&nbsp;/&nbsp;&nbsp;</td>
                  <td valign="top">
                    <select
                      name="rpDobY"
                      required={true}
                      className="form-control"
                      style={{ width: '120px', fontWeight: 'normal' }}
                      id="rpDobY"
                    >
                      <option value="">Year</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </label>
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
