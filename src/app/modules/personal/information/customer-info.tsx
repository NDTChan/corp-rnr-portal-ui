import React from 'react';
import './customer-info.scss';
import { useAppSelector } from 'app/config/store';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';
import { IOcrFileUpload } from 'app/shared/model/ocr-file-upload.model';
import { DOC_TYPE, PATTERN } from 'app/config/constants';

const CustomerInfo = () => {
  const { register, setValue, getValues } = useFormContext();
  const payload: IOcrFileUpload = useAppSelector(state => state.personal.data);
  const rnrInfo = !_.isUndefined(payload) ? payload.rnrInfo : undefined;

  const { rpFamilyNameEng, rpGivenNameEng, rpFamilyNameChi, rpGivenNameChi, rpDocNo, rpDob, rpDocType } = rnrInfo;
  setValue('rpFamilyNameEng', rpFamilyNameEng);
  setValue('rpGivenNameEng', rpGivenNameEng);
  setValue('rpFamilyNameChi', rpFamilyNameChi);
  setValue('rpGivenNameChi', rpGivenNameChi);

  if (_.isEmpty(rpFamilyNameChi) || _.isEmpty(rpGivenNameChi)) {
    setValue('disclaimerNoChineseName', true);
  }

  if (_.isEqual(rpDocType, DOC_TYPE.PASSPORT)) {
    setValue('rpPassport', rpDocNo);
  } else {
    const matchResult = rpDocNo.match(PATTERN.HKID);
    setValue('rpID1', matchResult[1]);
    setValue('rpID2', matchResult[2]);
    setValue('rpID3', matchResult[3]);
  }

  if (!_.isEmpty(rpDob) && PATTERN.DOB.test(rpDob)) {
    const matchResult = rpDob.match(PATTERN.DOB);
    setValue('rpDobD', matchResult[1]);
    setValue('rpDobM', matchResult[2]);
    setValue('rpDobY', matchResult[3]);
  }

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
          <input
            {...register('rpFamilyNameEng')}
            className={'form-control'}
            name="rpFamilyNameEng"
            type="text"
            id="rpFamilyNameEng"
            style={{ width: '100%' }}
            maxLength={50}
            required
          />
          <br />
          <span style={{ fontSize: '90%' }} id="form-label-given-name">
            Given Name
          </span>
          <br />
          <input
            className={'form-control'}
            {...register('rpGivenNameEng')}
            name="rpGivenNameEng"
            type="text"
            id="rpGivenNameEng"
            style={{ width: '100%' }}
            maxLength={50}
            required
          />
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
          <input
            {...register('rpFamilyNameChi')}
            className="chiName-group form-control"
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
          <input
            {...register('rpGivenNameChi')}
            className="chiName-group form-control"
            name="rpGivenNameChi"
            type="text"
            id="rpGivenNameChi"
            style={{ width: '100%' }}
            maxLength={50}
          />
          <br />
          <label>
            <table width="100%" border={0} cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td width="5%">
                    <input
                      {...register('disclaimerNoChineseName')}
                      className="g-checkbox noChineseName chiName-group form-control"
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
          {_.isEqual(rpDocType, DOC_TYPE.PASSPORT) ? (
            <div className="passport box">
              <span id="form-label-passport-no">Passport No.</span>
              <br />
              <input className={'form-control'} name="rpPassport" type="text" maxLength={50} id="rpPassport" style={{ width: '100%' }} />
            </div>
          ) : (
            <div className="hkid nhkid box">
              <span id="form-label-hkid">Hong Kong Identity Card</span>
              <br />
              <input
                className={'form-control'}
                {...register('rpID1')}
                name="rpID1"
                type="text"
                id="rpID1"
                size={4}
                maxLength={2}
                style={{ fontWeight: 'normal', width: '10%', display: 'inline' }}
              />
              &nbsp;
              <input
                className={'form-control'}
                {...register('rpID2')}
                name="rpID2"
                type="text"
                id="rpID2"
                size={12}
                maxLength={6}
                style={{ fontWeight: 'normal', width: '20%', display: 'inline' }}
              />
              &nbsp;
              <input
                className={'form-control'}
                {...register('rpID3')}
                name="rpID3"
                type="text"
                id="rpID3"
                size={4}
                maxLength={1}
                style={{ fontWeight: 'normal', width: '10%', display: 'inline' }}
              />
              <br />
              <br />
              <span id="form-label-hkid-guide">Example : X123456(A)</span>
            </div>
          )}
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
                      {...register('rpDobD')}
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
                      {...register('rpDobM')}
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
                      {...register('rpDobY')}
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
