import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Box, Typography, Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import Copyright from './Copyright'
import Settings from './Settings'
import List from './List'
import { fetchPopularRepos } from './store/actions/repos'
import { initStars } from './store/actions/stars'

export default function App() {
  const dispatch = useDispatch()

  const popularRepos = useSelector((state) => state.repos.list)
  const loading = useSelector((state) => state.repos.loading)

  const starred = useSelector((state) => state.stars.starsList)
  const starredInfos = useSelector((state) => state.stars.starsInfoList)

  useEffect(() => {
    dispatch(fetchPopularRepos())
    dispatch(initStars())
  }, [dispatch])

  const classes = useStyles()

  const [currentTab, setCurrentTab] = useState('trending')

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const starredRepos = starredInfos.filter((el) =>
    starred.includes(el.full_name)
  )

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Trending GitHub repositories
        </Typography>

        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="wrapped label tabs example"
          centered
        >
          <Tab
            value="trending"
            label="Popular"
            wrapped
            {...a11yProps('trending')}
          />
          <Tab
            value="favorites"
            label="Your stars"
            {...a11yProps('favorites')}
          />
        </Tabs>

        <TabPanel value={currentTab} index="trending">
          <Settings />
          <List data={popularRepos} loading={loading} />
        </TabPanel>
        <TabPanel value={currentTab} index="favorites">
          <List data={starredRepos} loading={loading} />
        </TabPanel>
        <Copyright />
      </Box>
    </Container>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}))
