import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup } from 'react-bootstrap';

import Profile from './Profile';
import Gallery from './Gallery';

class Music extends Component {

constructor(props){
  super(props);
  this.state={
    query:'',
    artist:null,
    tracks:[]
  }
}

search(){

  const BASE_URL='https://api.spotify.com/v1/search?';
  let FETCH_URL =BASE_URL+'q='+this.state.query
  +'&type=artist&limit=1';
  const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
 const auth_token = 'Bearer BQB-mSS54euhFhXMCyo1cbpVAIiwsgLXCw3SA4_eaBYRzz_TMrdzLDBvdeEZ-nZYYQbeEboEIK52NrtB9ZuqdG6ULsNa3mPJCbHEYIT8an3MT3nsx_926mBNe5Nfu0seanh6YnHDEBrKwoMbjCBvHKx17LbSY-rPEQ&refresh_token=AQD-TrvXE74TSFQhvnEi9q6K-UD0kJ9p61rrNFRTTiSwe72Mf65HHsDXy_5C8dW-ImO0gp2kurtVw18JAsb-DYk759irTs9TWs_Cj0ij9FO64xFF3CXePlzRbhAw8tldwG0';


  fetch(FETCH_URL,{
    method:'GET',
    headers: {
      'Content-Type' :'application/json',
      'Authorization': auth_token,
      },
    mode: 'cors',
    cache:'default'
  })

  .then(response =>
      Promise.resolve({
      data:response.json(),
      status: response.status
    })
    .then(post => post.data)
    .then(json =>json.artists)
    .then(items =>{
      console.log(items);
        const artist=items.items[0];
          this.setState(artist);
          FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
          fetch(FETCH_URL,{
            method:'GET',
            headers: {
              'Content-Type' :'application/json',
              'Authorization': auth_token,
              },
          })
          .then(response =>response.json())
          .then(json => {
            console.log('artist',json);
            const tracks=json.tracks;
            this.setState({tracks});
          })

  })
  );

}


render(){
      return (
        <div className="App-out">
          <div className="App-title"> React-Spotify</div>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search music"
                value ={this.state.query}
                onChange={event =>{this.setState({query:event.target.value})}}
                onKeyPress={event=>{
                  if(event.key==='Enter')
                    this.search();

                }}
              />

        <InputGroup.Addon onClick={()=>this.search()}>
          
        </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
      {
        this.state !==null
        ?
          <div>
            <Profile
              artist={this.state}
          />
          <Gallery
            tracks={this.state.tracks}
          />
          </div>
     :<div></div>
  }
  </div>
);

}

}
export default Music;