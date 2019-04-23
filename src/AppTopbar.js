import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
                    <button className="p-link">
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </button>
					<button className="p-link">
                        <span className="layout-topbar-item-text">Events</span>
                        <span className="layout-topbar-icon pi pi-calendar"/>
                    </button>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">Settings</span>
                        <span className="layout-topbar-icon pi pi-cog"/>
                    </button>
                    <button className="p-link">
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </button>
					<button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                    </button>
                </div>
            </div>
        );
    }
}