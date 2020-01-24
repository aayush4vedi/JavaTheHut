import React, {Component} from 'react';
import './App.css';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import Main from './components/main'
import {Link} from 'react-router-dom';

import Projects from './components/projects';
import Resume from './components/resume';
import Contact from './components/contact';

class App extends Component{
  render(){
    return (
      <div style={{height: '822px', position: 'relative'}}>
        <Layout>
            <Header class="header-color" transparent title={<Link to="/" style={{color: 'white',textDecoration: 'none'}}>Mr. Meeseeks</Link>}>
                <Navigation>
                    <Link to="/">About Me</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/resume">Resume</Link>
                    <Link to="/contact">contact</Link>
                </Navigation>
            </Header>
            <Drawer title="Title">
                <Navigation>
                    <Link to="/">About Me</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/resume">Resume</Link>
                    <Link to="/contact">contact</Link>
                </Navigation>
            </Drawer>
            <Content>
              <div className="page-content">
                <Main/>
                <h1>My Projects</h1>
                <hr/>
                <Projects/>
                <h1>My Resume</h1>
                <hr/>
                <Resume/>
                <h1>Contact me</h1>
                <hr/>
                <Contact/>
                <hr/>
              </div>
            </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
