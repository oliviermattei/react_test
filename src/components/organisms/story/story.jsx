import React from 'react';
import axios from 'axios';
import './story.scoped.scss';
import moment from 'moment';

export class Story extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      story: {},
      error: '',
      isLoaded: '',
    }

    this.domainNameRegex = new RegExp( /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/ );
  }

  getDomainName() {

    return this.state.story.url ? this.state.story.url.match( this.domainNameRegex )[0] : '';
  }

  getTime() {
    if(!this.state.story.time) return '';

    const date = moment( this.state.story.time * 1000 );
    const diff = moment().diff( date, 'minutes' );
    if(diff > 1440) {
      return `${parseInt( diff / 1440 )} days ago`;
    }
    else if(diff > 60) {
      return `${parseInt( diff / 60 )} hours ago`;
    }
    return `${parseInt( diff )} minutes ago`;

  }

  componentDidMount() {

    axios.get( `https://hacker-news.firebaseio.com/v0/item/${this.props.storyId}.json` )
      .then( ( { data } ) => {
          this.setState( {
            isLoaded: true,
            story: data
          } );
        },
        ( error ) => {
          this.setState( {
            isLoaded: true,
            error
          } );
        }
      )
  }

  render() {
    return (
      <div>
        {
          this.state.isLoaded &&
          <div className="story">
            <div>{this.props.index + 1}</div>
            <div className="upvote">ˆ</div>
            <div className="content">
              <article>
                {this.state.story.title}
                <span className="url">({this.getDomainName()}) </span>
              </article>
              <aside>
                {this.state.story.score} points by {this.state.story.by} | {this.getTime()}
              </aside>
            </div>
          </div>
        }
      </div>
    )
  }
}
