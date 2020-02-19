import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import MainPage from "./routes/MainPage";
import Max4DPage from "./routes/product/Max4DPage";
import Max4DAcceptPage from "./routes/product/Max4DAcceptPage";
import Max3DPage from "./routes/product/Max3DPage";
import Max3DAcceptPage from "./routes/product/Max3DAcceptPage";
import Mega645Page from "./routes/product/Mega645Page";
import Mega645AcceptPage from "./routes/product/Mega645AcceptPage";
import PaymentPage from "./routes/PaymentPage";
import ErrorPage from "./routes/ErrorPage";
import ResultPage from "./routes/ResultPage";
import Power655Page from "./routes/product/Power655Page";
import PaymentHistoryPage from "./routes/history/PaymentHistoryPage";
import PaymentHistoryItemPage from "./routes/history/PaymentHistoryItemPage";
import PlayerWinPage from "./routes/changePay/PlayerWinPage";
import ChangeBankPage from "./routes/changePay/ChangeBankPage";
import ChangeViettelPayPage from "./routes/changePay/ChangeViettelPayPage";
import DrawResultPage from "./routes/DrawResultPage";
import ChangeViettelPayAcPage from "./routes/changePay/ChangeViettelPayAcPage";
import ChangeBankAcPage from "./routes/changePay/ChangeBankAcPage";
import CompareResultPage from "./routes/history/CompareResultPage";
import RulesPaymentTextPage from "./routes/changePay/RulesPaymentTextPage";
import TermsTextPage from "./routes/TermsTextPage";
import MaintenancePage from "./routes/MaintenancePage";
import Max3DPlusPage from "./routes/product/Max3DPlusPage";
import Max3DPlusAcceptPage from "./routes/product/Max3DPlusAcceptPage";
import IndexPage from "./routes/IndexPage";
import PersonalInfoPage from './routes/player/PersonalInfoPage';
import UpdateInfoPage from './routes/player/UpdateInfoPage';
import CommissionPage from './routes/player/CommissionPage';
import WithdrawCommissionPage from './routes/player/WithdrawCommissionPage';
import CommissionManagerPage from './routes/player/CommissionManagerPage';
import ConfirmWithdrawComPage from './routes/player/ConfirmWithdrawComPage';
import KenoPage from "./routes/product/KenoPage";
import KenoAcceptPage from "./routes/product/KenoAcceptPage";
import ItemKenoPage from "./routes/history/ItemKenoPage";
import KenoTutorialPage from "./routes/product/KenoTutorialPage";
import Lottery123Page from "./routes/product/Lottery123Page";
import Lottery123AcceptPage from "./routes/product/Lottery123AcceptPage";
import Lottery234Page from "./routes/product/Lottery234Page";
import Lottery234AcceptPage from "./routes/product/Lottery234AcceptPage";
import Lottery234TutorialPage from "./routes/product/Lottery234TutorialPage";
import Lottery235Page from "./routes/product/Lottery235Page";
import Lottery235AcceptPage from "./routes/product/Lottery235AcceptPage";
import { API_HEADER } from "./config";
import qs from "query-string-es5";
import crypto from "crypto";
import CryptoJS from "crypto-js";
import request from "./utils/request";
// import { func } from 'prop-types';
// import moment from 'moment';
const hash = crypto.createHash("sha256");
// const sha1 = crypto.createHmac('sha1');

let isAuthenticated = false;
let message = "";

async function checkRequest(params) {
  const response = await request("Dictionary/CheckRequestWebview", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(params)
  });
  if (response.data.Code == "00") {
    // console.log(response.data);
    isAuthenticated = true;
    localStorage.setItem("mobileNumber", params.msisdn);
    localStorage.setItem("merchant_id", response.data.Value.MerchantID);
    localStorage.setItem("token", response.data.Value.PaymentToken);
  } else {
    localStorage.clear();
    message = "Không đủ quyền truy cập!";
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/error" }} />
        )
      }
    />
  );
}
function RouterConfig({ history }) {
  let param = qs.parse(history.location.search);

  //  localStorage.setItem("mobileNumber", "0978174138");
  checkRequest(param);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/error" exact render={() => <ErrorPage message={message} />} />
        <PrivateRoute path="/lottery-123" exact component={Lottery123Page} />
        <PrivateRoute path="/lottery-123-ac" exact component={Lottery123AcceptPage} />
        <PrivateRoute path="/lottery-234" exact component={Lottery234Page} />
        <PrivateRoute path="/lottery-234-ac" exact component={Lottery234AcceptPage} />
        <PrivateRoute path="/lottery-234-tutorial"exact component={Lottery234TutorialPage} />
        <PrivateRoute path="/lottery-235" exact component={Lottery235Page} />
        <PrivateRoute path="/lottery-235-ac" exact component={Lottery235AcceptPage} />
        <PrivateRoute path="/keno" exact component={KenoPage} />
        <PrivateRoute path="/kenoaccept" exact component={KenoAcceptPage} />
        <PrivateRoute path="/keno-tutorial" exact component={KenoTutorialPage} />
        <PrivateRoute path="/max4d" exact component={Max4DPage} />
        <PrivateRoute path="/max4daccept" exact component={Max4DAcceptPage} />
        <PrivateRoute path="/mega645" exact component={Mega645Page} />
        <PrivateRoute
          path="/mega645accept"
          exact
          component={Mega645AcceptPage}
        />
        <Route path="/payment" exact component={PaymentPage} />
        <PrivateRoute path="/power655" exact component={Power655Page} />
        <PrivateRoute path="/max3d" exact component={Max3DPage} />
        <PrivateRoute path="/max3daccept" exact component={Max3DAcceptPage} />
        <PrivateRoute path="/max3dplus" exact component={Max3DPlusPage} />
        <PrivateRoute
          path="/max3dplusaccept"
          exact
          component={Max3DPlusAcceptPage}
        />
        <PrivateRoute
          path="/paymenthistory"
          exact
          component={PaymentHistoryPage}
        />
        <PrivateRoute
          path="/payment-history-item"
          exact
          component={PaymentHistoryItemPage}
        />
        <PrivateRoute path="/item-keno" component={ItemKenoPage} />
        <Route path="/PaymentResult" component={ResultPage} />
        <PrivateRoute path="/win" component={PlayerWinPage} />
        <PrivateRoute path="/viettel" component={ChangeViettelPayPage} />
        <PrivateRoute path="/viettel-ac" component={ChangeViettelPayAcPage} />
        <PrivateRoute path="/bank" component={ChangeBankPage} />
        <PrivateRoute path="/bank-ac" component={ChangeBankAcPage} />
        <PrivateRoute path="/draw-result" component={DrawResultPage} />
        <PrivateRoute path="/compare-result" component={CompareResultPage} />
        <PrivateRoute path="/rules" component={RulesPaymentTextPage} />
        <Route path="/terms" component={TermsTextPage} />
        <PrivateRoute path="/maintenance" component={MaintenancePage} />
        <PrivateRoute path="/info" exact component={PersonalInfoPage} />
        <PrivateRoute path="/updateinfo" component={UpdateInfoPage} />
        <PrivateRoute path="/commission" component={CommissionPage} />
        <PrivateRoute
          path="/withdrawCommission"
          component={WithdrawCommissionPage}
        />
        <PrivateRoute
          path="/commissionManager"
          component={CommissionManagerPage}
        />
        <PrivateRoute
          path="/confirmWithdrawCom"
          component={ConfirmWithdrawComPage}
        />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
