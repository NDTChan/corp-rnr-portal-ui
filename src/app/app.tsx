import "react-toastify/dist/ReactToastify.css";
import "./config/dayjs";
import "./app.scss";

import { useAppSelector } from "app/config/store";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import ErrorBoundary from "app/shared/error/error-boundary";
import Header from "app/shared/layout/header/header";
import Footer from "app/shared/layout/footer/footer";
import Organisation from "app/modules/organisation/organisation";
import Personal from "app/modules/personal/personal";
import Declaration from "app/modules/declaration/declaration";
import Policy from "app/modules/policy/policy";

export const App = () => {
  const currentLocale = useAppSelector(state => state.locale.currentLocale);

  return (
    <div className="app-container">
      <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container"
                      toastClassName="toastify-toast" />
      <ErrorBoundary>
        <Header currentLocale={currentLocale} />
      </ErrorBoundary>
      <div className="container" id="app-view-container">
        <ErrorBoundary>
          <Organisation />
          <Personal />
          <Declaration />
          <Policy />
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default App;
