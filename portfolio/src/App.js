import React, {Component} from 'react';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main'
import {Link} from 'react-router-dom';

class App extends Component{
  render(){
    return (
      <div style={{height: '822px', position: 'relative'}}>
        <Layout>
            <Header class="header-color" transparent title={<Link to="/" style={{color: 'white',textDecoration: 'none'}}>Title</Link>}>
                <Navigation>
                    <Link to="/">Home</Link>
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
