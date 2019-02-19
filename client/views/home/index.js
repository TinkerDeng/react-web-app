import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import AppState from '../../store/app-state';

@inject('appState')
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  componentDidMount() {

  }

  change(event) {
    this.props.appState.changeName(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onInput={this.change} />
        {this.props.appState.name}
      </div>
    );
  }
}

Home.propTypes = {
  appState: PropTypes.instanceOf(AppState),
};
export default Home;
