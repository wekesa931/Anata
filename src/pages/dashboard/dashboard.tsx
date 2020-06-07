import React from 'react'
import { Paper, Tabs, Tab, Box, Typography } from '@material-ui/core';
import NavBar from '../../components/navbar/navbar.component';
import AirtableIframe from '../../components/airtableIframe/airtableIframe.component';
import Forms from '../../components/forms/forms.component';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Dashboard = () => {
    const [currentTab, setCurrentTab] = React.useState('one');

  const handleChange = (event: React.ChangeEvent<{}>, tab: string) => {
    setCurrentTab(tab);
  };
    return (
        <>
            <NavBar />
            <Paper square>
                <Tabs
                    value={currentTab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="Members" value="one" />
                    <Tab label="Tasks" value="two" />
                    <Tab label="Forms" value="three" />
                </Tabs>
            </Paper>
            <TabPanel value={currentTab} index="one">
                <AirtableIframe src="https://airtable.com/embed/shrMjDe4yAifyJLyV?backgroundColor=green&viewControls=on"/>
            </TabPanel>
            <TabPanel value={currentTab} index="two">
                <AirtableIframe src="https://airtable.com/embed/shrt929cXvPmRTBJD?backgroundColor=green&viewControls=on"/>
            </TabPanel>
            <TabPanel value={currentTab} index="three">
                <Forms/>
            </TabPanel>
        </>
    )
}

export default Dashboard;
