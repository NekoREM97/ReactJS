import React from "react";
import { WingBlank, Toast, InputItem, Footer, Modal, Text } from "antd-mobile";
import styles from "./Main.css";
import CountDownMega from "../utils/countDownMega";
import CountDownPower from "../utils/countDownPower";
import CountDownMax3D from "../utils/countDownMax3D";
import CountDownKeno from "../utils/countDownKeno";
import CountDownLottery123 from "../utils/countDownLottery123";
import CountDownLottery234 from "../utils/countDownLottery234";
import {
  stringToNumberFormat,
  checkPrize,
  getNameWinByNum,
  getNameWinMax3DPlusByNum,
  getDayOpen,
  getPadLeft
} from "../utils/Helper";
import Countdown, { zeroPad } from "react-countdown-now";
import moment from "moment";

// let height = window.innerHeight;
// let width = window.innerWidth;
const date = new Date();
const model = {
  padding: 0
};


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountMega: 0,
      drawDateMega: "",
      amountPower: 0,
      drawDatePower: "",
      balance: 0,
      TermsText: "",
      modal1: false,
      // customerName: "",
      // amountWin: "",
      productID: 0,
      // prizeName: "",
      win: false,
      drawCodeKeno: "",
      downTime: 600,
      closeTime: 0,
      showKeno: 0,
      isCloseSale: false
    };
  }

  componentWillReceiveProps(nextProps) {

    if (
      nextProps.checkProductPilot !== undefined &&
      nextProps.checkProductPilot.data !== undefined
    ) {
      if (nextProps.checkProductPilot.data.Code === "01") {
        if (
          nextProps.checkMobilePilot !== undefined &&
          nextProps.checkMobilePilot.data !== undefined
        ) {
          if (nextProps.checkMobilePilot.data.Code === "00") {
            this.setState({ showKeno: 1 });
          }
        } else {
          this.setState({ showKeno: 0 });
        }
      } else {
        this.setState({ showKeno: 1 });
      }
    }
    if (
      nextProps.drawCodeKeno !== undefined &&
      nextProps.drawCodeKeno.data !== undefined
    ) {
      // console.log(nextProps.drawCodeKeno);
      if (nextProps.drawCodeKeno.data.Code === "00") {
        this.setState({
          drawCodeKeno: nextProps.drawCodeKeno.data.Value.DrawCode,
          closeTime: nextProps.drawCodeKeno.data.Value.CloseTime
        });
      } else if (nextProps.drawCodeKeno.data.Code === "02") {
        this.setState({ isCloseSale: true });
      }
    }
    this.setState({
      amountMega: localStorage.getItem("amountMega"),
      drawDateMega: localStorage.getItem("drawDateMega"),
      amountPower: localStorage.getItem("amountPower"),
      drawDatePower: localStorage.getItem("drawDatePower")
    });
    if (localStorage.getItem("amountMega") === null) {
      this.setState({ amountMega: 0 });
    }
    if (localStorage.getItem("amountPower") === null) {
      this.setState({ amountPower: 0 });
    }
    if (nextProps.Terms !== undefined) {
      if (nextProps.Terms.data !== undefined) {
        if (nextProps.Terms.data.Code === "00") {
          //   console.log(nextProps.paymentRules.data.Value);
          this.setState({
            TermsText: nextProps.Terms.data.Value
          });
        } else {
          Toast.info("Không lấy được điều khoản sử dụng", 2);
        }
      }
    }

    if (nextProps.balance !== undefined) {
      //&& nextProps.products.data !== undefined
      // console.log(nextProps.balance.data);
      if (nextProps.balance.data.Code === "00") {
        this.setState({
          balance: nextProps.balance.data.Value
        });
      }
    }
    if (nextProps.Noti !== undefined && nextProps.Noti.data !== undefined) {
      if (nextProps.Noti.data.Code === "00") {
        this.setState({
          customerName: nextProps.Noti.data.Value.MobileNumber,
          amountWin: nextProps.Noti.data.Value.MaxAmount,
          productID: nextProps.Noti.data.Value.ProductID,
          win: true
        });
      }
    }

    if (
      nextProps.checkAddOrder !== undefined &&
      nextProps.checkAddOrder.data !== undefined
    ) {
      // console.log(nextProps.checkAddOrder.data);
      // console.log(this.state.productsID);
      if (nextProps.checkAddOrder.data.Code === "00") {
        switch (this.state.productsID) {
          case 1:
            this.props.onMega645();
            break;
          case 2:
            this.props.onMax4D();
            break;
          case 3:
            this.props.onPower655();
            break;
          case 4:
            this.props.onMax3D();
            break;
          case 5:
            this.props.onMax3DPlus();
            break;
          case 6:
            this.props.onKeno();
            break;
          case 7:
            this.props.onLottery123();
            break;
          case 8: 
            this.props.onLottery234();  
            break;
          case 9: 
            this.props.onLottery235();  
            break;  
          default:
            break;
        }
      } else {
        Toast.info(nextProps.checkAddOrder.data.Message, 5);
      }
    }
    if (nextProps.err != undefined) {
      Toast.info("Lỗi kết nối hệ thống", 2);
    }
  }

  // componentDidUpdate() {
  //   console.log(this.state.showKeno);
  // }

  createMarkup() {
    return { __html: this.state.TermsText };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }
  onTerms = () => {
    this.props.onTerms(this.state.TermsText);
  };
  sec() {
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let closeTime = this.state.closeTime;
    let sec = (closeTime - (hour * 10000 + minute * 100 + second)) * 1000;
    let now = hour * 10000 + minute * 100 + second;
    // console.log(now)
    // console.log(closeTime)
    return sec;
  }
  renderModalRulesText = () => {
    return (
      <Modal
        className={model}
        visible={this.state.modal1}
        transparent
        maskClosable={false}
        onClose={this.onClose("modal1")}
        title="Điều khoản sử dụng"
        // style={{ width: "100%", padding: 0 }}

        footer={[
          {
            text: "Đóng",
            onPress: () => {
              this.onClose("modal1")();
            }
          }
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        {this.rulesText()}
      </Modal>
    );
  };

  showModal = key => e => {
    e.preventDefault();
    this.setState({
      [key]: true
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false
    });
  };

  renderProduct = () => {
    let amount = this.state.amountMega - this.state.amountPower
    if (amount > 0) {
      return (
        <div>
          {this.renderMegaTop()}
          {this.renderPower()}
          {this.renderMax3DPlus()}
        </div>
      );
    } else {
      if (this.state.amountMega >= 20000000000) {
        return (
          <div>
            {this.renderPowerTop()}
            {this.renderMega()}
            {this.renderMax3DPlus()}
          </div>
        );
      } else {
        return (
          <div>
            {this.renderPowerTop()}
            {this.renderMega()}
            {this.renderMax3DPlus()}
          </div>
        );
      }
    }
  };
  plusDrawPeriod = () => {
    let drawcode = parseInt(this.state.drawCodeKeno);
    let DrawCodeNow = drawcode + 1;
    this.setState({
      drawCodeKeno: DrawCodeNow.toString().padStart(7, "0")
    });
  };

  renderOpenSaleKeno() {
    return (
      <div
        className={styles.div_button_keno}
        onClick={() => {
          this.props.onCheckAddOrder(6), this.setState({ productsID: 6 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div style={{ position: "relative" }}>
            <img
              className={styles.div_img}
              src={require("../assets/keno_logo_white.png")}
              alt=""
            />
            <div className={styles.div_img_text_keno}>
              Kỳ QSMT #{this.state.drawCodeKeno}
            </div>
          </div>
          <div className={styles.div_border} />
          <img
            className={styles.div_img_noel1}
            src={require("../assets/hoadao01.png")}
            alt=""
          />
          <div className={styles.div_group_text}>
            <div className={styles.open_keno}>Cả tuần, 10 phút/1 kỳ quay</div>
            <div
              className={styles.div_text_amt}
              style={{ color: "#FFF", fontSize: "27pt" }}
            >
              <CountDownKeno
                nextPeriod={this.plusDrawPeriod}
                downTime={this.state.closeTime}
              />
            </div>
            <div
              className={styles.button_buy}
              style={{ background: "#FFF", color: "black" }}
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCloseSaleKeno() {
    return (
      <div
        className={styles.div_button_keno}
        onClick={() => {
          this.props.onCheckAddOrder(6), this.setState({ productsID: 6 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/keno_logo_white.png")}
              alt=""
            />
          </div>
          <div className={styles.div_border} />
          <img
            className={styles.div_img_noel1}
            src={require("../assets/hoadao01.png")}
            alt=""
          />
          <div className={styles.div_group_text}>
            <div
              className={styles.div_text_amt}
              style={{ color: "#FFF", fontSize: "27pt" }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className={styles.count_down_close_sale}></div>
                <div className={styles.count_down_close_sale}></div>
                <div style={{ color: "#60605B", marginRight: -4 }}>:</div>
                <div className={styles.count_down_close_sale}></div>
                <div className={styles.count_down_close_sale}></div>
              </div>
            </div>
            <div
              className={styles.button_buy}
              style={{ background: "#e32e35", color: "white" }}
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderMax3DPlus() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(4);
          this.setState({ productsID: 5 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/max3dcong.png")}
              alt=""
            />
            <div className={styles.div_img_text} style={{ fontSize: "11pt" }}>
              <CountDownMax3D />
            </div>
          </div>
          <div className={styles.div_border} />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(5, 1)}
            <div className={styles.div_text_amt} style={{ fontSize: "27pt" }}>
              <span className={styles.span_text}>x</span>100.000
              <span className={styles.span_text}>lần</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
          <img
            className={styles.div_img_noel}
            src={require("../assets/hoadao.png")}
            alt=""
          />
        </div>
      </div>
    );
  }

  renderMega() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(1), this.setState({ productsID: 1 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/mega.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownMega />
            </div>
          </div>
          <div className={styles.div_border} />
          <img
            className={styles.div_img_noel1}
            src={require("../assets/hoadao01.png")}
            alt=""
          />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(1, 1)}
            <div className={styles.div_text_amt}>
              {this.state.amountMega
                .toString()
                .substring(0, this.state.amountMega.toString().length - 9)}
              <span className={styles.span_text}>Tỷ VND</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderMegaTop() {
    return (
      <div
        className={styles.div_button_jp}
        onClick={() => {
          this.props.onCheckAddOrder(3), this.setState({ productsID: 1 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/mega_top.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownMega />
            </div>
          </div>
          <div className={styles.div_border} />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(1, 2)}
            <div className={styles.div_text_amt} style={{ color: "#FFF" }}>
              {this.state.amountMega
                .toString()
                .substring(0, this.state.amountMega.toString().length - 9)}
              <span className={styles.span_text} style={{ color: "#FFF" }}>
                Tỷ VND
              </span>
            </div>
            <div
              className={styles.button_buy}
              style={{ background: "#FFF", color: "black" }}
            >
              Đặt vé
            </div>
          </div>
          <img
            className={styles.div_img_noel}
            src={require("../assets/hoadao.png")}
            alt=""
          />
        </div>
      </div>
    );
  }

  renderPower() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(3), this.setState({ productsID: 3 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/power.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownPower />
            </div>
          </div>
          <div className={styles.div_border} />
          <img
            className={styles.div_img_noel1}
            src={require("../assets/hoadao01.png")}
            alt=""
          />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(3, 1)}
            <div className={styles.div_text_amt}>
              {this.state.amountPower
                .toString()
                .substring(0, this.state.amountPower.toString().length - 9)}
              <span className={styles.span_text}>Tỷ VND</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }

  renderPowerTop() {
    return (
      <div
        className={styles.div_button_jp}
        onClick={() => {
          this.props.onCheckAddOrder(3), this.setState({ productsID: 3 });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/power_top.png")}
              alt=""
            />
            <div className={styles.div_img_text}>
              <CountDownPower />
            </div>
          </div>
          <div className={styles.div_border} />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(3, 2)}
            <div className={styles.div_text_amt} style={{ color: "#FFF" }}>
              {this.state.amountPower
                .toString()
                .substring(0, this.state.amountPower.toString().length - 9)}
              <span className={styles.span_text} style={{ color: "#FFF" }}>
                Tỷ VND
              </span>
            </div>
            <div
              className={styles.button_buy}
              style={{ background: "#FFF", color: "black" }}
            >
              Đặt vé
            </div>
          </div>
          <img
            className={styles.div_img_noel}
            src={require("../assets/hoadao.png")}
            alt=""
          />
        </div>
      </div>
    );
  }
  ////////////////////////////////////////////////
  renderLottery234() {
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          this.props.onCheckAddOrder(8), 
          this.setState({ 
            productsID: 8 
          });
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img}
              src={require("../assets/lottery_234.png")}
              alt=""
            />
            <div className={styles.div_img_text} style={{ fontSize: "11pt" }}>
              <CountDownLottery234 />
            </div>
          </div>
          <div className={styles.div_border} />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(7, 1)}
            <div className={styles.div_text_amt} style={{ fontSize: "27pt" }}>
              <span className={styles.span_text}>x</span>1.000
              <span className={styles.span_text}>lần</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
          <img
            className={styles.div_img_noel}
            src={require("../assets/hoadao.png")}
            alt=""
          />
        </div>
      </div>
    );
  }
  renderLottery235(){
    return (
      <div
        className={styles.div_button}
        onClick={() => {
          // this.props.onCheckAddOrder(7);
          // this.setState({ productsID: 7 });
          this.props.onLottery235();
        }}
      >
        <div style={{ display: "flex", padding: "4px 0" }}>
          <div>
            <img
              className={styles.div_img_dt}
              src={require("../assets/235.png")}
              alt=""
            />
            <div
              className={styles.div_img_text}
              style={{ fontSize: "11pt" }}
            >
              <CountDownLottery123 />
            </div>
          </div>
          <div className={styles.div_border} />
          <img
            className={styles.div_img_noel1}
            src={require("../assets/hoadao01.png")}
            alt=""
          />
          <div className={styles.div_group_text}>
            {this.renderOpenDay(7, 1)}
            <div className={styles.div_text_amt}>
              <span className={styles.span_text}>x</span>20.000
                <span className={styles.span_text}>lần</span>
            </div>
            <div className={styles.button_buy}>Đặt vé</div>
          </div>
        </div>
      </div>
    );
  }
  ////////////////////////////////////////////////
  renderBanner() {
    if (this.state.win === true) {
      if (this.state.productID === 1) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/mega.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                  fontFamily: "Helvetica"
                }}
              >
                Đã trúng
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 2) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/max4d.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                  fontFamily: "Helvetica"
                }}
              >
                Đã trúng
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 3) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/power.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "#9c2b20",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                  fontFamily: "Helvetica"
                }}
              >
                Đã trúng{" "}
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 5) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/max3dcong.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                  fontFamily: "Helvetica"
                }}
              >
                Đã trúng{" "}
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinMax3DPlusByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else if (this.state.productID === 4) {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: "100%", height: 80 }}
                src={require("../assets/banner/max3d.png")}
                alt=""
              />
              <div
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "54%",
                  transform: "translate(-50%, -50%)",
                  color: "yellow",
                  fontFamily: "Helvetica",
                  fontWeight: "bold",
                  fontSize: 12,
                  width: 200
                }}
              >
                CHÚC MỪNG QUÝ KHÁCH HÀNG
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "108px",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#1a367f",
                  fontFamily: "Helvetica"
                }}
              >
                Đã trúng{" "}
              </div>
              {/* <Text className={styles.prize_name}>{getNameWinMax3DPlusByNum(this.state.prizeName)}</Text> */}
              <div className={styles.amount_noti}>
                {stringToNumberFormat(this.state.amountWin)} VNĐ
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.div_button}>
            <div style={{ display: "flex" }}>
              <img
                style={{ width: 357, height: 63 }}
                src={require("../assets/banner_01.png")}
                alt=""
              />
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className={styles.div_button}>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: "100%", maxWidth: 357, height: 63 }}
              src={require("../assets/banner_01.png")}
              alt=""
            />
          </div>
        </div>
      );
    }
  }
  renderKenoOrBanner() {
    if (this.state.showKeno === 0) {
      return <div>{this.renderBanner()}</div>;
    } else {
      if (this.state.isCloseSale)
        return <div>{this.renderCloseSaleKeno()}</div>;
      else return <div>{this.renderOpenSaleKeno()}</div>;
    }
  }

  renderOpenDay = (productID, type) => {
    const name = getDayOpen(productID);
    if (name != "") {
      if (type == 1) {
        if (productID == 5)
          return <div className={styles.open_day_max3dc}>{name}</div>;
        else return <div className={styles.open_day}>{name}</div>;
      } else {
        return <div className={styles.open_day_top}>{name}</div>;
      }
    } else {
      return <div></div>;
    }
  };

  render() {
    // console.log(this.state.closeTime)
    return (
      <div style={{ fontFamily: "Helvetica" }}>
        <div style={{ backgroundColor: "#EEEEEE" }}>
          <div
            style={{
              background: "#4397f7",
              height: 100,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 18,
                color: "#FFF",
                marginBottom: 30
              }}
            >
              {/* <div style={{alignSelf:"center",width:"100%",marginLeft:50,textAlign:"center"}}>LUCKY LOTTER</div>  */}
              <div
                style={{ marginLeft: 10, width: "100%", alignSelf: "center" }}
              >
                <img
                  style={{
                    height: 40,
                    padding: 5
                  }}
                  src={require("../assets/logoxuan.png")}
                  alt=""
                />
              </div>
              {
                // localStorage.getItem('merchant_id') === "1" ? (
                <div
                  className={styles.flex_center}
                  onClick={() => this.props.onWin()}
                >
                  <div
                    style={{
                      alignSelf: "center",
                      marginRight: 4,
                      paddingTop: 10,
                      fontSize: "12pt"
                    }}
                  >
                    {stringToNumberFormat(this.state.balance) + "đ"}
                  </div>
                  <div
                    style={{
                      background: "#FFF",
                      marginRight: 12,
                      borderRadius: "50%",
                      height: 30
                    }}
                    className={styles.flex_center}
                  >
                    <img
                      style={{
                        width: 20,
                        height: 20,
                        padding: 5
                      }}
                      src={require("../assets/cup_do.png")}
                      alt=""
                    />
                  </div>
                </div>
                // ) : (<div></div>)
              }
            </div>
          </div>
          {/* <InputItem value={localStorage.getItem("param")}>Ok</InputItem> */}
          <div style={{ margin: "0 6px" }}>
            <div style={{ paddingTop: 10, marginTop: -50 }}>
              {this.renderKenoOrBanner()}
              {this.renderLottery234()}
              {this.renderLottery235()}
              {/* {this.renderKeno()} */}
              {/* {this.renderBanner()} */}
              {this.renderProduct()}

              <div
                className={styles.div_button}
                onClick={() => {
                  this.props.onCheckAddOrder(2);
                  this.setState({ productsID: 2 });
                }}
              >
                <div style={{ display: "flex", padding: "4px 0" }}>
                  <div>
                    <img
                      className={styles.div_img}
                      src={require("../assets/max4d.png")}
                      alt=""
                    />
                    <div className={styles.div_img_text}>
                      <CountDownPower />
                    </div>
                  </div>
                  <div className={styles.div_border} />
                  <img
                    className={styles.div_img_noel1}
                    src={require("../assets/hoadao01.png")}
                    alt=""
                  />
                  <div className={styles.div_group_text}>
                    {this.renderOpenDay(2, 1)}
                    <div className={styles.div_text_amt}>
                      <span className={styles.span_text}>x</span>1500
                      <span className={styles.span_text}>lần</span>
                    </div>
                    <div className={styles.button_buy}>Đặt vé</div>
                  </div>
                </div>
              </div>
              <div
                className={styles.div_button}
                onClick={() => {
                  this.props.onCheckAddOrder(4);
                  this.setState({ productsID: 4 });
                }}
              >
                <div style={{ display: "flex", padding: "4px 0" }}>
                  <div>
                    <img
                      className={styles.div_img}
                      src={require("../assets/max3d.png")}
                      alt=""
                    />
                    <div
                      className={styles.div_img_text}
                      style={{ fontSize: "11pt" }}
                    >
                      <CountDownMax3D />
                    </div>
                  </div>
                  <div className={styles.div_border} />
                  <div className={styles.div_group_text}>
                    {this.renderOpenDay(4, 1)}
                    <div className={styles.div_text_amt}>
                      <span className={styles.span_text}>x</span>100
                      <span className={styles.span_text}>lần</span>
                    </div>
                    <div className={styles.button_buy}>Đặt vé</div>
                  </div>
                  <img
                    className={styles.div_img_noel}
                    src={require("../assets/hoadao.png")}
                    alt=""
                  />
                </div>
              </div>

              <div
                className={styles.div_button}
                onClick={() => {
                  this.props.onCheckAddOrder(7);
                  this.setState({ productsID: 7 });
                }}
              >
                <div style={{ display: "flex", padding: "4px 0" }}>
                  <div>
                    <img
                      className={styles.div_img_dt}
                      src={require("../assets/lottery_123.png")}
                      alt=""
                    />
                    <div
                      className={styles.div_img_text}
                      style={{ fontSize: "11pt" }}
                    >
                      <CountDownLottery123 />
                    </div>
                  </div>
                  <div className={styles.div_border} />
                  <img
                    className={styles.div_img_noel1}
                    src={require("../assets/hoadao01.png")}
                    alt=""
                  />
                  <div className={styles.div_group_text}>
                    {this.renderOpenDay(7, 1)}
                    <div className={styles.div_text_amt}>
                      <span className={styles.span_text}>x</span>40.000
                        <span className={styles.span_text}>lần</span>
                    </div>
                    <div className={styles.button_buy}>Đặt vé</div>
                  </div>
                </div>
              </div>

              <div className={styles.div_button}>
                <div
                  style={{
                    display: "flex",
                    padding: "4px 0",
                    flexDirection: "row"
                  }}
                >
                  <div
                    className={styles.div_b_button}
                    onClick={() => this.props.onDrawResult()}
                  >
                    <div style={{ textAlign: "center" }}>
                      <img
                        className={styles.img_btn}
                        src={require("../assets/result.png")}
                        alt=""
                      />
                      <div className={styles.div_img_text}>Kết quả QSMT</div>
                    </div>
                  </div>
                  {/* <div className={styles.div_border} /> */}
                  <div
                    className={styles.div_b_button}
                    onClick={() => this.props.onHistory()}
                  >
                    <div style={{ textAlign: "center" }}>
                      <img
                        className={styles.img_btn}
                        src={require("../assets/history.png")}
                        alt=""
                      />
                      <div className={styles.div_img_text}>Lịch sử đặt vé</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rules_div_payment}>
            <div className={styles.rulesPayment}>
              <div>Vui lòng đọc kỹ</div>
              <div
                className={styles.rule_a_payment}
                onClick={() => this.onTerms()}
              >
                Điều khoản sử dụng
              </div>
            </div>
            <div>trước khi đặt vé</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
