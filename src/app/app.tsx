import 'react-toastify/dist/ReactToastify.css';
import './config/dayjs';
import './app.scss';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ErrorBoundary from 'app/shared/error/error-boundary';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import Organisation from 'app/modules/organisation/organisation';
import Personal from 'app/modules/personal/personal';
import Declaration from 'app/modules/declaration/declaration';
import Policy from 'app/modules/policy/policy';
import LoadingBar from 'react-redux-loading-bar';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'reactstrap';
import { IRnrSubmit } from './shared/model/rnr-submit.model';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yub from 'yup';
import _ from 'lodash';
import { DOC_TYPE, NO, YES } from 'app/config/constants';
import { checkAge, checkDigit, checkValidDate } from 'app/shared/util/common-utils';
import { submitOcrResult } from 'app/shared/reducers/ocr-result';
import { getParamStateWithQueryParams } from 'app/shared/util/entity-utils';

export const App = () => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const dispatch = useAppDispatch();
  const validationSchema = yub
    .object({
      disclaimerNoChineseName: yub.ref('rpFamilyNameChi'),
    })
    .shape(
      {
        rpDocType: yub.string().required('validatorMsg.required'),
        rpFamilyNameEng: yub
          .string()
          .required('validatorMsg.required')
          .matches(/^[a-zA-Z ]+$/, 'validatorMsg.englishLang'),
        rpGivenNameEng: yub
          .string()
          .required('validatorMsg.required')
          .matches(/^[a-zA-Z ]+$/, 'validatorMsg.englishLang'),
        rpFamilyNameChi: yub.string().when('rpGivenNameChi', {
          is: rpGivenNameChi => !_.isEmpty(rpGivenNameChi),
          then: schema =>
            schema.required('validatorMsg.required').matches(/^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g, 'validatorMsg.chineseLang'),
        }),
        rpGivenNameChi: yub.string().when('rpFamilyNameChi', {
          is: rpFamilyNameChi => !_.isEmpty(rpFamilyNameChi),
          then: schema =>
            schema.required('validatorMsg.required').matches(/^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g, 'validatorMsg.chineseLang'),
        }),
        disclaimerNoChineseName: yub.bool().when(['rpFamilyNameChi', 'rpGivenNameChi'], {
          is(rpFamilyNameChi, rpGivenNameChi) {
            return _.isEmpty(rpFamilyNameChi) && _.isEmpty(rpGivenNameChi);
          },
          then: schema => schema.oneOf([true], 'validatorMsg.required'),
        }),
        rpPassport: yub.string().when('rpDocType', {
          is: rpDocType => _.isEqual(rpDocType, DOC_TYPE.PASSPORT),
          then: schema => schema.required('validatorMsg.required'),
        }),
        rpID1: yub
          .string()
          .matches(/^[A-Z]+$/)
          .when('rpDocType', {
            is: rpDocType => _.includes([DOC_TYPE.NEW_HKID, DOC_TYPE.OLD_HKID], rpDocType),
            then: schema => schema.required('validatorMsg.required'),
          })
          .max(2),
        rpID2: yub
          .string()
          .when('rpDocType', {
            is: rpDocType => _.includes([DOC_TYPE.NEW_HKID, DOC_TYPE.OLD_HKID], rpDocType),
            then: schema => schema.required('validatorMsg.required'),
          })
          .max(6, 'validatorMsg.wrongInformation'),
        rpID3: yub.string().when('rpDocType', {
          is: rpDocType => _.includes([DOC_TYPE.NEW_HKID, DOC_TYPE.OLD_HKID], rpDocType),
          then: schema =>
            schema.required().test('checkDigits', 'validatorMsg.wrongInformation', (value, context) => {
              const { rpID1, rpID2 } = context.parent;
              return checkDigit(rpID1, rpID2, value);
            }),
        }),
        file: yub
          .mixed()
          .required()
          .test('extension', 'validatorMsg.extension', (files: FileList) => {
            if (files.length === 0) return false;
            const type = files.item(0).type;
            return _.includes(['image/jpg', 'image/jpeg'], type);
          })
          .test('fileSize', 'validatorMsg.fileSizeLimit', (files: FileList) => {
            if (files.length === 0) return false;
            const size = files.item(0).size;
            return size <= 5 * 1024 * 1024;
          })
          .test('docTypeSelected', 'validatorMsg.docTypeSelected', (files: FileList, context) => {
            const { rpDocType } = context.parent;
            return !_.isEmpty(rpDocType) && !_.isUndefined(rpDocType) && !_.isNull(rpDocType);
          }),
        rpDobD: yub
          .number()
          .required('validatorMsg.required')
          .test('checkAge', 'validatorMsg.checkAgeAbove18', (value, context) => {
            const { rpDobM, rpDobY } = context.parent;
            return checkAge(rpDobY, rpDobM, value);
          })
          .test('checkValidDate', 'validatorMsg.date', (value, context) => {
            const { rpDobM, rpDobY } = context.parent;
            return checkValidDate(rpDobY, rpDobM, value);
          }),
        rpDobM: yub
          .number()
          .required('validatorMsg.required')
          .test('checkAge', 'validatorMsg.checkAgeAbove18', (value, context) => {
            const { rpDobD, rpDobY } = context.parent;
            return checkAge(rpDobY, value, rpDobD);
          })
          .test('checkValidDate', 'validatorMsg.date', (value, context) => {
            const { rpDobD, rpDobY } = context.parent;
            return checkValidDate(rpDobY, value, rpDobD);
          }),
        rpDobY: yub
          .number()
          .required('validatorMsg.required')
          .test('checkAge', 'validatorMsg.checkAgeAbove18', (value, context) => {
            const { rpDobD, rpDobM } = context.parent;
            return checkAge(value, rpDobM, rpDobD);
          })
          .test('checkValidDate', 'validatorMsg.date', (value, context) => {
            const { rpDobD, rpDobM } = context.parent;
            return checkValidDate(value, rpDobM, rpDobD);
          }),
        disclaimerPrivacyStatement: yub.bool().oneOf([true], 'validatorMsg.required'),
        disclaimerOverAgeOf18: yub.bool().oneOf([true], 'validatorMsg.required'),
        disclaimerNoHkid: yub.bool().when('rpDocType', {
          is: rpDocType => _.isEqual(rpDocType, DOC_TYPE.PASSPORT),
          then: schema => schema.oneOf([true], 'validatorMsg.required'),
        }),
      },
      [['rpGivenNameChi', 'rpFamilyNameChi']]
    );
  const methods = useForm({ resolver: yupResolver(validationSchema), criteriaMode: 'all' });
  const isUploadSuccess = useAppSelector(state => state.personal.uploaded);

  const onSubmit: SubmitHandler<IRnrSubmit> = data => {
    const rnrToken = getParamStateWithQueryParams('token', location.search);
    const formData = toSubmissionFormData(data, rnrToken);
    dispatch(submitOcrResult(formData));
  };

  const toSubmissionFormData = (data: IRnrSubmit, payloadId: string): FormData => {
    const formData = new FormData();
    formData.append('payloadId', payloadId);
    formData.append('disclaimer', data.disclaimerOverAgeOf18 ? YES : NO);
    formData.append('disclaimerStatment', data.disclaimerPrivacyStatement ? YES : NO);
    formData.append('disclaimerNoHkid', data.disclaimerNoHkid ? YES : NO);
    formData.append('disclaimerNoChineseName', data.disclaimerNoChineseName ? YES : NO);
    const rnrInfo = toRnrInfoJson(data);
    formData.append('rnrInfo', rnrInfo);
    return formData;
  };
  const toRnrInfoJson = (data: IRnrSubmit): string => {
    let rpDocType: string;
    let rpDocNo: string;
    if (_.isEqual(data.rpDocType, DOC_TYPE.PASSPORT)) {
      rpDocType = DOC_TYPE.PASSPORT;
      rpDocNo = data.rpPassport;
    } else {
      rpDocType = DOC_TYPE.HKID;
      rpDocNo = data.rpID1 + data.rpID2 + '(' + data.rpID3 + ')';
    }
    return JSON.stringify({
      rpFamilyNameEng: data.rpFamilyNameEng,
      rpGivenNameEng: data.rpGivenNameEng,
      rpFamilyNameChi: data.rpFamilyNameChi,
      rpGivenNameChi: data.rpGivenNameChi,
      rpDocType,
      rpDocNo,
      rpDob: data.rpDobD + '/' + data.rpDobM + '/' + data.rpDobY,
    });
  };

  return (
    <div className="app-container">
      <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
      <ErrorBoundary>
        <LoadingBar style={{ opacity: '', width: '100%' }} className={'loading-bar'} />
        <Header currentLocale={currentLocale} />
      </ErrorBoundary>
      <div className="container" id="app-view-container">
        <ErrorBoundary>
          <Organisation />
          <br />
          <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <Personal />
              <Declaration />
              <Policy />
              <div className="row submit-container">
                <div className="col-xs-12">
                  <input className="btn btn-light submit-btn" type="submit" value="Submit" id="submitBtn" disabled={!isUploadSuccess} />
                </div>
              </div>
            </Form>
          </FormProvider>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default App;
