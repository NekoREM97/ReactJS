import request from "../utils/request";
import { API_HEADER } from "../config";

function* getDrawMax4d() {
  return yield request("api/Max4DResult/GetByDate?date=", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getDrawMega645() {
  return yield request("api/Mega645Result/GetByDate?date=", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getDrawPower() {
  return yield request("api/Power655Result/GetByDate?date=", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getDrawMax3D() {
  return yield request("api/Max3DResult/GetByDate?date=", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getProvince() {
  return yield request("api/Province/GetAll", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getDistrictByProvinceID(provinceID) {
  return yield request(
    "api/District/GetByProvinceID?ProvinceID=" + provinceID,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* getWardByDistrictID(districtID) {
  return yield request(
    "api/Ward/GetWardByDistrictID?DistrictId=" + districtID,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

// function* getPlayerByMobile(mobileNumber) {
//     return yield request('api/Player/GetByMobileNumber?MobileNumber=' + mobileNumber, {
//         method: 'GET',
//         headers: API_HEADER
//     })
// }
function* getPlayerByMobile(mobileNumber, merchantID) {
  return yield request(
    "api/Player/GetByMobileNumber?MobileNumber=" +
      mobileNumber +
      "&MerchantID=" +
      merchantID,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}
function* getProductAmount() {
  return yield request("Dictionary/GetProductAmount", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getBank() {
  return yield request("api/Bank/GetAllBank", {
    method: "GET",
    headers: API_HEADER
  });
}
function* getBalanceByMobileNumber(mobileNumber) {
  return yield request(
    "api/TransPlayerWin/GetBalanceByMobileNumber?MobileNumber=" + mobileNumber,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* getProduct() {
  return yield request("api/product/GetAll", {
    method: "GET",
    headers: API_HEADER
  });
}

//Dictionary/GetMax4DResult

function* getMax4dResult() {
  return yield request("Dictionary/GetMax4DResult", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getPwResult() {
  return yield request("Dictionary/GetPowerResult", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getMegaResult() {
  return yield request("Dictionary/GetMegaResult", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getReadRules() {
  return yield request("api/RulesReward/ReadRules", {
    method: "GET",
    headers: API_HEADER
  });
}

function* checkAddOrder(productID) {
  return yield request("Order/LimitPurchaseTime?ProductID=" + productID, {
    method: "GET",
    headers: API_HEADER
  });
}

function* getMax3DResult() {
  return yield request("api/Max3DResult/GetAll", {
    method: "GET",
    headers: API_HEADER
  });
}
function* getReadTerms() {
  return yield request("api/RulesReward/ReadTerms", {
    method: "GET",
    headers: API_HEADER
  });
}

function* checkOutOfNumber(data) {
  return yield request("Dictionary/CheckOutOfNumber", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
function* checkOutOfNumberMax4D(data) {
  return yield request("Dictionary/CheckOutOfNumber4D", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}

//Winner notification
function* WinnerNoification(MobileNumber) {
  return yield request(
    "api/Notification/WebviewWinner?MobileNumber=" + MobileNumber,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* getKenoResult() {
  return yield request("Dictionary/GetKenoResult", {
    method: "GET",
    headers: API_HEADER
  });
}

function* getLottery123Result() {
  return yield request("Dictionary/GetLottery123Result", {
    method: "GET",
    headers: API_HEADER
  });
}

export const dictionary = {
  getDrawMax4d,
  getDrawMega645,
  getDrawPower,
  getProvince,
  getDistrictByProvinceID,
  getWardByDistrictID,
  getPlayerByMobile,
  getProductAmount,
  getBank,
  getBalanceByMobileNumber,
  getProduct,
  getMegaResult,
  getPwResult,
  getMax4dResult,
  getReadRules,
  checkAddOrder,
  getDrawMax3D,
  getMax3DResult,
  getReadTerms,
  checkOutOfNumber,
  checkOutOfNumberMax4D,
  WinnerNoification,
  getKenoResult,
  getLottery123Result
};
