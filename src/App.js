import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/index';
import Body from './components/Body/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleSearch } from './actions/search';

class App extends Component {

  render() {

    return (
      <div>
        <NavBar
          search={this.props.search}
          handleSearch={this.props.handleSearch}
        />
        <Body search={this.props.search} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    handleSearch: handleSearch,
  },
    dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);