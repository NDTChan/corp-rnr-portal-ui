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

export const App = () => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);

  const methods = useForm();
  const onSubmit: SubmitHandler<IRnrSubmit> = data => console.log(data);
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
            </Form>
          </FormProvider>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default App;
