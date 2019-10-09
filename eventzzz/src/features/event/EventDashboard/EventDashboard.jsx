import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'

class EventDashboard extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={12}>
                    <EventList/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <h2>Right col</h2>
                </Grid.Column>
            </Grid>
        )
    }
}

export default EventDashboard