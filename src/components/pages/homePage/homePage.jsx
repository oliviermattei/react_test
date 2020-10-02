import React from 'react';
import axios from 'axios';
import { Story } from '../../organisms/story/story';
import { Header } from '../../organisms/header/header';
import './homePage.scoped.scss';
import { CONFIG } from '../../../config';

export class HomePage extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      itemIds: [],
      error: '',
      isLoaded: false,
      storyType: 'top',
      cursor: 0,
      pagination: 22,
    }
  }

  getStories( storyType ) {
    console.log( storyType );
    this.state.isLoaded = false;
    axios.get( CONFIG.apiUrl + CONFIG.apiEndpoints[storyType] )
      .then( ( { data } ) => {
          this.setState( {
            isLoaded: true,
            itemIds: data
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

  componentDidMount() {
    this.getStories( this.state.storyType );

  }

  selectStoryType = ( storyType ) => {
    this.setState( { storyType } );

    this.getStories( storyType );
  };

  render() {
    return (
      <div className="homepage">
        <Header onSelect={this.selectStoryType}/>
        <div className="container">
          {this.state.isLoaded && this.state.itemIds
            .slice( this.state.cursor, this.state.pagination )
            .map( ( id, index ) => <Story index={index} storyId={id}/> )}
        </div>
      </div>
    );
  }
}
