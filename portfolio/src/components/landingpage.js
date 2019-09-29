import React, {Component} from 'react';
import {Grid, Cell} from 'react-mdl';
class LandingPage extends Component{
  render(){
    return (
        <div style={{width: '100%', margin: 'auto'}}>
            <Grid className="landing-page-grid">
              <Cell col={12}>
                <img
                  src = 'https://cdn1.iconfinder.com/data/icons/flat-character-color-1/60/flat-design-character_1-512.png'
                  alt = 'avatar'
                  className = 'avatar-img'
                />
                <div className="banner">
                  <h1>I love making cool shit.</h1>
                  <hr/>
                  <p>Node | React | Python | Go | Php</p>
                  <div className="social-links">
                    <a href="https://github.com/aayush4vedi">
                      <i class="fab fa-github" area-hidden="true"></i>
                    </a>
                    <a href="https://stackoverflow.com/">
                      <i class="fab fa-stack-overflow"></i>
                    </a>
                    <a href="https://facebook.com">
                      <i class="fab fa-facebook"></i>
                    </a>
                    <a href="https://quora.com">
                      <i class="fab fa-quora"></i>
                    </a>
                  </div>
                </div>
              </Cell>
          </Grid>
        </div>
    );
  }
}

export default LandingPage;
