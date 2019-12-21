import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AppInlineProfile} from "./AppInlineProfile";
import { MenuWeedIcon } from './components/Icons';

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
					<button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                      <MenuWeedIcon />
                    </button>
                    <button className="p-link " onClick={this.props.onToggleMenu}>
                    </button>  
                <div className="layout-topbar-icons button">
                <AppInlineProfile />
                </div>
            </div>
        );
    }
}