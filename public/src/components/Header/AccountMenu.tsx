import {IconButton, Menu, MenuItem} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import * as React from 'react';
import {Link} from 'react-router-dom';
import {dict} from '../../dict';

interface IProps {
  userName: string;
  logout: () => void;
}

const AccountLink = (props: any) => <Link to='/account' {...props}/>;
const StatLink = (props: any) => <Link to='/stats' {...props}/>;

export class AccountMenu extends React.Component<IProps, {
  anchor: HTMLElement,
}> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      anchor: null,
    };
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  public openMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({anchor: event.currentTarget});
  }

  public closeMenu() {
    this.setState({anchor: null});
  }

  public render() {
    const {anchor} = this.state;
    const open = Boolean(anchor);
    return (
      <React.Fragment>
        <IconButton
          onClick={this.openMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchor}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          open={open}
          onClose={this.closeMenu}
        >
          <MenuItem disabled={true} divider={true}><em>{this.props.userName}</em></MenuItem>
          <MenuItem onClick={this.closeMenu} component={AccountLink}>{dict.header_menu_account_link}</MenuItem>
          <MenuItem onClick={this.closeMenu} component={StatLink}>{dict.header_menu_stat_link}</MenuItem>
          <MenuItem onClick={this.props.logout}>{dict.logout}</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}
