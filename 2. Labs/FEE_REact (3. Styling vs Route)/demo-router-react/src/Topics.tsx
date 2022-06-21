import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Topics extends Component<any, any> {
    state = {};

    render() {
        let queryParam = new URLSearchParams(this.props.location.search);
        console.log(this.props);
        return (
            <div>
                Topic of user {queryParam.get('userid')} - {queryParam.get('name')}{' '}
            </div>
        );
    }
}
export default withRouter(Topics);
