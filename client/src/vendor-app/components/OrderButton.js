import React from "react";

class OrderButton extends React.Component {
  constructor() {
    super();
    this.state = { disabled: false };
  }
  handleClick = () => {
    this.setState({ disabled: !this.state.disabled });
    this.props.onClick(this.props.el);
  };
  render() {
    return (
      <RaisedButton
        disabled={this.state.disabled}
        key={this.props.el}
        label={this.props.el}
        style={style.button}
        onClick={() => handleButtonSelectZero(el)}
      />
    );
  }
}

export default OrderButton;
