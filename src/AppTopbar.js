import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppInlineProfile} from "./AppInlineProfile";

export class AppTopbar extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="layout-topbar clearfix">
                <div className="layout-topbar-icons">
					<button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars" />
                    </button>
                </div>
                <div className="layout-topbar-icons button">
                <AppInlineProfile />
                </div>
            </div>
        );
    }
}