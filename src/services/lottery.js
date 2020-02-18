import request from "../utils/request";
import { API_HEADER } from "../config";

function* getLottery123Draw() {
  return yield request("LotteryResult/GetLottery123Draw", {
    method: "GET",
    headers: API_HEADER
  });
}

export const lottery = {
  getLottery123Draw
};
