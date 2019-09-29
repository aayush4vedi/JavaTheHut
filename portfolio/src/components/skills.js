import React, { Component } from 'react';
import { Grid, Cell, ProgressBar } from 'react-mdl';

class Skills extends Component {
  render() {
    return(
      <Grid>
        <Cell col={12}>
          <div style={{display: 'flex'}}>{this.props.skill} <ProgressBar style={{margin: 'auto', width: '75%',color: '33E9FF'}} progress={this.props.progress} buffer= {100-this.props.progress}/> </div>
        </Cell>
      </Grid>
    )
  }
}

export default Skills;