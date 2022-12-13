import React from 'react';
import './customer-info.scss';
import { useAppSelector } from 'app/config/store';
import { useFormContext } from 'react-hook-form';
import _ from 'lodash';
import { IOcrFileUpload } from 'app/shared/model/ocr-file-upload.model';
import { DOC_TYPE, PATTERN } from 'app/config/constants';
import dayjs from 'dayjs';

const CustomerInfo = () => {
  const { register, setValue, resetField } = useFormContext();
  const [isDisclaimerChineseChecked, setIsDisclaimerChineseChecked] = React.useState(false);

  const payload: IOcrFileUpload = useAppSelector(state => state.personal.data);
  let docType = '';

  React.useEffect(() => {
    const rnrInfo = !_.isUndefined(payload) ? payload.rnrInfo : undefined;
    const { rpFamilyNameEng, rpGivenNameEng, rpFamilyNameChi, rpGivenNameChi, rpDocNo, rpDob, rpDocType } = rnrInfo;
    docType = rpDocType;

    setValue('rpFamilyNameEng', rpFamilyNameEng);
    setValue('rpGivenNameEng', rpGivenNameEng);

    if (!isDisclaimerChineseChecked) {
      setValue('rpFamilyNameChi', rpFamilyNameChi);
      setValue('rpGivenNameChi', rpGivenNameChi);
    }

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
  }, [payload]);

  const onChangeDisclaimerChinese = e => {
    const isChecked = e.target.checked;
    if (isChecked) {
      resetField('rpFamilyNameChi');
      resetField('rpGivenNameChi');
      // setValue('rpFamilyNameChi', '');
      // setValue('rpGivenNameChi', '');
    }
    setIsDisclaimerChineseChecked(isChecked);
  };

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
            {...register('rpFamilyNameChi', {
              disabled: isDisclaimerChineseChecked,
            })}
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
            {...register('rpGivenNameChi', {
              disabled: isDisclaimerChineseChecked,
            })}
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
                      {...register('disclaimerNoChineseName', {
                        onChange: onChangeDisclaimerChinese,
                      })}
                      className="g-checkbox noChineseName chiName-group"
                      name="disclaimerNoChineseName"
                      type="checkbox"
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
          {_.isEqual(docType, DOC_TYPE.PASSPORT) ? (
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
                      <option value="" disabled={true}>
                        Day
                      </option>
                      {_.range(1, 31).map(value => {
                        let twoDigitValue = String(value).padStart(2, '0');
                        return (
                          <option key={'day_' + twoDigitValue} value={twoDigitValue}>
                            {twoDigitValue}
                          </option>
                        );
                      })}
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
                      <option value="" disabled={true}>
                        Month
                      </option>
                      {_.range(1, 12).map(value => {
                        let twoDigitValue = String(value).padStart(2, '0');
                        return (
                          <option key={'month_' + twoDigitValue} value={twoDigitValue}>
                            {twoDigitValue}
                          </option>
                        );
                      })}
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
                      <option value="" disabled={true}>
                        Year
                      </option>
                      {_.range(1900, dayjs().year() - 18).map(value => {
                        return (
                          <option key={'year_' + value} value={value}>
                            {value}
                          </option>
                        );
                      })}
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
