import React from 'react';

import './header.scoped.scss';

export class Header extends React.Component {
  click( value ) {
    this.props.onSelect( value );
  }

  render() {
    return (
      <header>
        <div className="left">

          <div className="logo">Y</div>
          <div className="menu">

            <b
              className="title"
              onClick={( e ) => this.click( 'top' )}>
              Travaux News
            </b>
            <ul>
              <li onClick={( e ) => this.click( 'new' )}>new</li>
              {/*<li onClick={( e ) => this.click( 'past' )}>past</li>*/}
              {/*<li onClick={( e ) => this.click( 'comments' )}>comments</li>*/}
              <li onClick={( e ) => this.click( 'ask' )}>ask</li>
              <li onClick={( e ) => this.click( 'show' )}>show</li>
              <li onClick={( e ) => this.click( 'jobs' )}>jobs</li>
              {/*<li onClick={( e ) => this.click( 'submit' )}>submit</li>*/}
            </ul>

          </div>
        </div>
        <div className="login">
          login
        </div>
      </header>
    )
  }
}
