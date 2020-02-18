import React from 'react';
import { connect } from 'dva';
import { Button, WingBlank } from 'antd-mobile';
import Example from '../components/Example';

function IndexPage() {

  return (
    <Example/>
  );
}

export default connect()(IndexPage);
