import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Box, Typography, Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import Copyright from './Copyright'
import Settings from './Settings/Settings'
import List from './List/List'
import TabPanel from './TabPanel'

import { fetchPopularRepos } from '../store/actions/repos'
import { initStars } from '../store/actions/stars'

export default function App() {
  const dispatch = useDispatch()

  const popularRepos = useSelector((state) => state.repos.list)
  const loadingRepos = useSelector((state) => state.repos.loading)

  const starredInfos = useSelector((state) => state.stars.starsInfoList)
  const loadingStarred = useSelector((state) => state.stars.loading)

  useEffect(() => {
    dispatch(fetchPopularRepos())
    dispatch(initStars())
  }, [dispatch])

  const [currentTab, setCurrentTab] = useState('trending')

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

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
            id="wrapped-tab-trending"
            aria-controls="wrapped-tabpanel-trending"
          />
          <Tab
            value="favorites"
            label="Your stars"
            id="wrapped-tab-favorites"
            aria-controls="wrapped-tabpanel-favorites"
          />
        </Tabs>

        <TabPanel value={currentTab} index="trending">
          <Settings />
          <List data={popularRepos} loading={loadingRepos} />
        </TabPanel>
        <TabPanel value={currentTab} index="favorites">
          <List data={starredInfos} loading={loadingStarred} />
        </TabPanel>
        <Copyright />
      </Box>
    </Container>
  )
}
