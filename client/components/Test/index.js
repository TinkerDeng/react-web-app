import React from 'react';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
    this.add = this.add.bind(this);
  }

  add() {
    const count = this.state.count + 1;
    this.setState({
      count,
    });
  }

  render() {
    const { count } = this.state;
    if (count === 5) {
      throw new Error('aa');
    }
    return [
      <p>aaa</p>,
      <p>ccc</p>,
    ];
  }
}

export default Test;
