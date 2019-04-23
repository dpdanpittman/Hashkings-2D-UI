import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

/*                  //Goes inside render
                    <button className="p-link">
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </button>
*/

    render() {
        return (
            <div className="layout-topbar clearfix">
                <div className="layout-topbar-icons">
				<a href="/#/Login"><b><font color="green">Logged in?</font></b></a>
					<button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                    </button>
                </div>
            </div>
        );
    }
}