import React from "react";
import styles from "./Main.css";

class TermsText extends React.Component {
  state = {
    message: ""
  };
  componentWillMount() {
    //   console.log(this.props)
     window.scrollTo(0, 0);
    if (this.props.location.message !== undefined) {
      this.setState({ message: this.props.location.message });
    }
  }
  createMarkup() {
    return { __html: this.state.message };
  }

  rulesText() {
    return <div dangerouslySetInnerHTML={this.createMarkup()} />;
  }

  render() {
    return <div style={{background:"#FFF",padding:12}} className={styles.content}>{this.rulesText()}</div>;
  }
}

export default TermsText;
