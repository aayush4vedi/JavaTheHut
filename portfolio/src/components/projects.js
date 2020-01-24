import React, {Component} from 'react';
import {Tabs, Tab, Grid, Cell, Card, CardText, CardTitle, Button, CardActions, CardMenu, IconButton} from 'react-mdl';

class Projects extends Component{
  constructor(props) {
      super(props)
      this.state = { activeTab: 1 };
  }

  toggleCategories(){
    if(this.state.activeTab === 0){
      return(
        <div class="project-cards">
          {/*  #Project1 */}
          <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #ffcf17'}}>#Project1</CardTitle>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenan convallis.
            </CardText>
            <CardActions border>
                <Button colored>Github</Button>
                <Button colored>Codepen</Button>
                <Button colored>Live Demo</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share"/>
            </CardMenu>
          </Card>

          {/*  #Project2 */}
          <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #ff5315'}}>#Project2</CardTitle>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenan convallis.
            </CardText>
            <CardActions border>
                <Button colored>Github</Button>
                <Button colored>Codepen</Button>
                <Button colored>Live Demo</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share"/>
            </CardMenu>
          </Card>
        </div>

      )
    }else if(this.state.activeTab === 1){
      return(
        <div class="project-cards">
          {/*  #Project1 */}
          <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #ffcf17'}}>#Project1</CardTitle>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenan convallis.
            </CardText>
            <CardActions border>
                <Button colored>Github</Button>
                <Button colored>Codepen</Button>
                <Button colored>Live Demo</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share"/>
            </CardMenu>
          </Card>

          {/*  #Project2 */}
          <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #ff5315'}}>#Project2</CardTitle>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenan convallis.
            </CardText>
            <CardActions border>
                <Button colored>Github</Button>
                <Button colored>Codepen</Button>
                <Button colored>Live Demo</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share"/>
            </CardMenu>
          </Card>

          {/*  #Project3 */}
          <Card shadow={5} style={{width: '320px', height: '320px', margin: 'auto'}}>
            <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat  #46B6AC'}}>#Project3</CardTitle>
            <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenan convallis.
            </CardText>
            <CardActions border>
                <Button colored>Github</Button>
                <Button colored>Codepen</Button>
                <Button colored>Live Demo</Button>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
              <IconButton name="share"/>
            </CardMenu>
          </Card>
        </div>
      )
    }else if(this.state.activeTab === 2){
      return(
        <div>
          <h1> Python</h1>
        </div>
      )
    }else if(this.state.activeTab === 3){
      return(
        <div>
          <h1> Go</h1>
        </div>
      )
    }else if(this.state.activeTab === 4){
      return(
        <div>
          <h1> Rails</h1>
        </div>
      )
    }else if(this.state.activeTab === 5){
      return(
        <div>
          <h1> Php</h1>
        </div>
      )
    }
  }

  render(){
    return (
      <div className="project-tabs">
          <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
              <Tab>NodeJS</Tab>
              <Tab>ReactJS</Tab>
              <Tab>Python</Tab>
              <Tab>Go</Tab>
              <Tab>Rails</Tab>
              <Tab>Php</Tab>
          </Tabs>
          <section>
              <div className="project-grids">
                <Grid className="projects-grid">
                  <Cell col={12}>
                    <div className="content">{this.toggleCategories()}</div>
                  </Cell>
                </Grid>
              </div>
          </section>
      </div>  
    );
  }
}


export default Projects;
