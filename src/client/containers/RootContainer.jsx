import BaseContainer from "./base/BaseContainer";
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PIXIComponent from './../components/PIXIComponent';

class RootContainer extends BaseContainer {
    constructor() {
        super();
    }

    render() {
        return (
            <PIXIComponent/>
        );
    }
}

RootContainer.propTypes = {

};

function mapStateToProps(state) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);