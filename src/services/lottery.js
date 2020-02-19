import request from "../utils/request";
import { API_HEADER } from "../config";

function* getLottery123Draw() {
  return yield request("LotteryResult/GetLottery123Draw", {
    method: "GET",
    headers: API_HEADER
  });
}
function* getLottery234Draw() {
  return yield request("LotteryResult/GetLottery234Draw", {
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
function* getTutorial(widthImg) {
  return yield request(
    "api/RulesReward/ReadTutorialKeno?widthImg=" + widthImg,
    {
      method: "GET",
      headers: API_HEADER
    }
  );
}
export const lottery234 = {
  getLottery123Draw,
  getLottery234Draw,
  getFee,
  getTutorial
};
