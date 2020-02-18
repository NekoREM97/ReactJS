import request from "../utils/request";
import { API_HEADER } from "../config";

function* orderAdd(data) {
  return yield request("Order/Add", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}

function* orderSearch(data) {
  return yield request("Order/SearchOrder", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}

function* getOrderItemByCode(orderCode) {
  return yield request("Order/GetByOrderCode?Code=" + orderCode, {
    method: "GET",
    headers: API_HEADER
  });
}

function* getFee(data) {
  return yield request("Order/GetFee", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
function* ReportErrorOrder(data) {
  return yield request("Order/ReportErrorOrder", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
function* GetOrderHistory(data) {
  return yield request(
    "Order/GetOrderHistory?mobileNumber=" +
      data.MobileNumber +
      "&merchantID=" +
      data.MerchantID +
      "&statusGroup=" +
      data.StatusGroup +
      "&pageIndex=" +
      data.PageIndex,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}
function* GetOrderHistory(data) {
  return yield request(
    "Order/GetOrderHistory?mobileNumber=" +
      data.MobileNumber +
      "&merchantID=" +
      data.MerchantID +
      "&statusGroup=" +
      data.StatusGroup +
      "&productID=" +
      data.ProductID +
      "&pageIndex=" +
      data.PageIndex,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* GetOrderPendingError(data) {
  return yield request(
    "Order/GetOrderPendingError?mobileNumber=" +
      data.MobileNumber +
      "&merchantID=" +
      data.MerchantID +
      "&productID=" +
      data.ProductID +
      "&status=" +
      data.Status,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* GetOrderSuccess(data) {
  return yield request(
    "Order/GetOrderSuccess?mobileNumber=" +
      data.MobileNumber +
      "&merchantID=" +
      data.MerchantID +
      "&tabIndex=" +
      data.TabIndex +
      "&pageIndex=" +
      data.PageIndex,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}

function* getOrderItemKeno(code) {
  return yield request("Keno/GetOrderItemByCode?code=" + code, {
    method: "GET",
    headers: API_HEADER
  });
}
function* addOrderKeno(data) {
  return yield request("Keno/AddOrder", {
    method: "POST",
    headers: API_HEADER,
    body: JSON.stringify(data)
  });
}
export const payment = {
  orderAdd,
  orderSearch,
  getOrderItemByCode,
  getFee,
  ReportErrorOrder,
  GetOrderHistory,
  GetOrderPendingError,
  GetOrderSuccess,
  getOrderItemKeno,
  addOrderKeno
};
