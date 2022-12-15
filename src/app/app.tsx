import 'react-toastify/dist/ReactToastify.css';
import './config/dayjs';
import './app.scss';

import { useAppSelector } from 'app/config/store';
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
import { DOC_TYPE } from 'app/config/constants';
import { checkAge, checkDigit, checkValidDate } from 'app/shared/util/common-utils';

export const App = () => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);
  const validationSchema = yub.object().shape(
    {
      rpDocType: yub.string().required(),
      rpFamilyNameEng: yub
        .string()
        .required()
        .matches(/^[a-zA-Z ]+$/),
      rpGivenNameEng: yub
        .string()
        .required()
        .matches(/^[a-zA-Z ]+$/),
      rpFamilyNameChi: yub
        .string()
        .matches(/^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g)
        .when('rpGivenNameChi', {
          is: rpGivenNameChi => !_.isEmpty(rpGivenNameChi),
          then: schema => schema.required(),
        }),
      rpGivenNameChi: yub
        .string()
        .matches(/^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g)
        .when('rpFamilyNameChi', {
          is: rpFamilyNameChi => !_.isEmpty(rpFamilyNameChi),
          then: schema => schema.required(),
        }),
      disclaimerNoChineseName: yub.bool().when(['rpFamilyNameChi', 'rpGivenNameChi'], {
        is: (rpFamilyNameChi, rpGivenNameChi) => _.isEmpty(rpFamilyNameChi) && _.isEmpty(rpGivenNameChi),
        then: schema => schema.required(),
      }),
      rpPassport: yub.string().when('rpDocType', {
        is: rpDocType => _.isEqual(rpDocType, DOC_TYPE.PASSPORT),
        then: schema => schema.required(),
      }),
      rpID1: yub
        .string()
        .matches(/^[A-Z]+$/)
        .when('rpDocType', {
          is: rpDocType => _.includes([DOC_TYPE.NEW_HKID, DOC_TYPE.OLD_HKID], rpDocType),
          then: schema => schema.required(),
        }),

      rpID2: yub
        .string()
        .when('rpDocType', {
          is: rpDocType => _.includes([DOC_TYPE.NEW_HKID, DOC_TYPE.OLD_HKID], rpDocType),
          then: schema => schema.required(),
        })
        .min(6),
      rpID3: yub
        .string()
        .when('rpDocType', {
          is: rpDocType => _.includes([DOC_TYPE.NEW_HKID, DOC_TYPE.OLD_HKID], rpDocType),
          then: schema => schema.required(),
        })
        .test('checkDigits', 'checking this digits', (value, context) => {
          const { rpID1, rpID2 } = context.parent;
          return checkDigit(rpID1, rpID2, value);
        }),
      file: yub
        .mixed()
        .required()
        .test('extension', '', (file: File) => {
          return _.includes(['jpg', 'jpeg'], file.type);
        })
        .test('fileSize', '', (file: File) => {
          return file.size <= 5 * 1024 * 1024;
        })
        .test('docTypeSelected', '', (file: File, context) => {
          const { rpDocType } = context.parent;
          return !_.isEmpty(rpDocType) && !_.isUndefined(rpDocType) && !_.isNull(rpDocType);
        }),
      rpDobD: yub
        .number()
        .required()
        .test('checkAge', 'this is check Age bro', (value, context) => {
          const { rpDobM, rpDobY } = context.parent;
          return checkAge(rpDobY, rpDobM, value);
        })
        .test('checkValidDate', 'this is check valid date bro', (value, context) => {
          const { rpDobM, rpDobY } = context.parent;
          return checkValidDate(rpDobY, rpDobM, value);
        }),
      rpDobM: yub
        .number()
        .required()
        .test('checkAge', 'this is check Age bro', (value, context) => {
          const { rpDobD, rpDobY } = context.parent;
          return checkAge(rpDobY, value, rpDobD);
        })
        .test('checkValidDate', 'this is check valid date bro', (value, context) => {
          const { rpDobD, rpDobY } = context.parent;
          return checkValidDate(rpDobY, value, rpDobD);
        }),
      rpDobY: yub
        .number()
        .required()
        .test('checkAge', 'this is check Age bro', (value, context) => {
          const { rpDobD, rpDobM } = context.parent;
          return checkAge(value, rpDobM, rpDobD);
        })
        .test('checkValidDate', 'this is check valid date bro', (value, context) => {
          const { rpDobD, rpDobM } = context.parent;
          return checkValidDate(value, rpDobM, rpDobD);
        }),
      disclaimerPrivacyStatement: yub.bool().oneOf([true]),
      disclaimerOverAgeOf18: yub.bool().oneOf([true]),
      disclaimerNoHkid: yub.bool().when('rpDocType', {
        is: rpDocType => _.isEqual(rpDocType, DOC_TYPE.PASSPORT),
        then: schema => schema.oneOf([true]),
      }),
    },
    [['rpGivenNameChi', 'rpFamilyNameChi']]
  );
  const formOptions = { resolver: yupResolver(validationSchema) };

  const methods = useForm(formOptions);
  const onSubmit: SubmitHandler<IRnrSubmit> = data => console.log(data);
  const isUploadSuccess = useAppSelector(state => state.personal.uploaded);
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
