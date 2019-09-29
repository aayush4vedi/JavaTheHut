import React, {Component} from 'react';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main'
import {Link} from 'react-router-dom';

class App extends Component{
  render(){
    return (
      <div style={{height: '822px', position: 'relative'}}>
        <Layout style={{background: 'url(https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80) center / cover'}}>
            <Header transparent title="Title" style={{color: 'white'}}>
                <Navigation>
                    <Link to="/resume">Resume</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/aboutme">About Me</Link>
                    <Link to="/contact">contact</Link>
                </Navigation>
            </Header>
            <Drawer title="Title">
                <Navigation>
                    <Link to="/resume">Resume</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/aboutme">About Me</Link>
                    <Link to="/contact">contact</Link>
                </Navigation>
            </Drawer>
            <Content>
              <div className="page-content">
                <Main/>
              </div>
            </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
