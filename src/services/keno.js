import request from "../utils/request";
import { API_HEADER } from "../config";

function* getDrawPeriod() {
  return yield request("Keno/GetDrawPeriod", {
    method: "GET",
    headers: API_HEADER
  });
}
// function* checkProductPilot() {
//   return yield request("Dictionary/GetProductPilot", {
//     method: "GET",
//     headers: API_HEADER
//   });
// }
function* checkMobilePilot(mobileNumber) {
  return yield request(
    "Dictionary/CheckMobilePilot?mobileNumber=" + mobileNumber,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}
function* getFee(data) {
  return yield request("Order/GetFee", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
function* checkProductPilot(data) {
  return yield request(
    "Dictionary/CheckProductPilot?merchantID=" +
      data.MerchantID +
      "&productID=" +
      data.ProductID +
      "&mobileNumber=" +
      data.MobileNumber,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* getTutorial(widthImg) {
  return yield request(
    "api/RulesReward/ReadTutorialKeno?widthImg=" + widthImg,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

export const keno = {
  getDrawPeriod,
  checkMobilePilot,
  getFee,
  checkProductPilot,
  getTutorial
};
