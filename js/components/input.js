import React from 'react';
import Proptypes from 'prop-types';
import { InputItem, List } from 'antd-mobile';
import styled from 'styled-components';
import { isIphone } from 'js/utils/userAgent';

let moneyKeyboardWrapProps;
if (isIphone) {
  moneyKeyboardWrapProps = {
    onTouchStart: (e) => e.preventDefault(),
  };
}

export default class Input extends React.Component {
  inputRef = React.createRef();

  state = {
    isFocus: false,
  };

  focus = (...rest) => {
    const { onFocus = () => {} } = this.props;
    onFocus(...rest);
    this.setState({
      isFocus: true,
    });
  };

  blur = (val) => {
    const { onBlur = () => {} } = this.props;
    onBlur(val);
    this.setState({
      isFocus: false,
    });
  };

  render() {
    const {
      children,
      className,
      placeholder,
      placeholder2,
      value,
      ...rest
    } = this.props;
    const isFocus = this.state.isFocus || !!value;
    return (
      <StyledList
        className={`${className} ${
          isFocus && placeholder2 ? 'isFocus' : ''
        } input-item`}
      >
        <InputItem
          ref={this.inputRef}
          moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          value={value}
          {...rest}
          placeholder={isFocus ? placeholder : placeholder2 || placeholder}
          onFocus={this.focus}
          onBlur={this.blur}
        >
          {this.props.children}
        </InputItem>
        {isFocus && placeholder2 && (
          <div className="placeholder2">{placeholder2}</div>
        )}
      </StyledList>
    );
  }
}

Input.propTypes = {
  children: Proptypes.any,
  className: Proptypes.string,
  placeholder: Proptypes.string,
  placeholder2: Proptypes.string,
  onBlur: Proptypes.func,
  onFocus: Proptypes.func,
  value: Proptypes.any,
};

const StyledList = styled(List)`
  border-radius: 0.08rem;
  position: relavice;
  &.isFocus .am-list-item .am-input-control {
    margin-top: 0.16rem;
  }
  .am-list-body {
    border-radius: 0.08rem;
    border: none;
    &:after,
    &:before {
      display: none !important;
    }
  }
  .am-list-item.am-input-item {
    background: #f9fafc;
    height: 0.54rem;
    .am-list-line {
      border-bottom: none;
    }
    .am-list-line::after {
      display: none !important;
    }
    .am-input-control input {
      font-size: 0.16rem;
      color: #343951;
      &:disabled {
        background-color: transparent;
      }
    }
  }
  .am-input-clear {
    height: 0.16rem;
    width: 0.16rem;
    background-color: #9da0ab;
    background-size: 0.15rem auto;
  }
  .am-input-extra {
    color: #343951;
    font-size: 0.16rem;
  }
  .placeholder2 {
    z-index: 1;
    color: rgba(68, 74, 102, 0.48);
    position: absolute;
    top: 0rem;
    left: 0.15rem;
    height: 0.22rem;
    width: 50%;
    background: #f9fafc;
    line-height: 0.22rem;
    font-size: 0.1rem;
  }
`;
