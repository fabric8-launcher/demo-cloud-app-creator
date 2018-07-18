import React from 'react';
import Step from '../components/Step';

import { Grid, List, Segment } from 'semantic-ui-react'

const AppReadyStep = ({ action, id, title, icon }) => (
    <Step.Item
        title={title}
        icon={icon}
        iconColor="green"
    >
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <h1>While you wait</h1>
                </Grid.Column>
                <Grid.Column>
                    <a>Take a look at your build</a><br/>
                    <i>This will take a couple of minutes</i>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <h1>Your next step</h1>
                </Grid.Column>
                <Grid.Column>
                    Next Steps: Update your booster using Continuous Delivery<br/>
                    Your booster is automatically configured to build and deploy with new commits.
                    <List ordered>
                        <List.Item>Clone your project from GitHub.
                            <Segment secondary>$ git clone https://github.com/someuser/my-app</Segment>
                        </List.Item>
                        <List.Item>Open your project in your desired IDE or editor.</List.Item>
                        <List.Item>Perform any updates you want to the project.</List.Item>
                        <List.Item>Commit and push your changes back to GitHub.
                            <Segment secondary>$ git add .<br/>
                            $ git commit -m "Made an update"<br/>
                            $ git push</Segment>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    </Step.Item>
);

AppReadyStep.defaultProps = {
  title: 'Application Ready',
  icon: 'check circle outline'
};

export default AppReadyStep;
