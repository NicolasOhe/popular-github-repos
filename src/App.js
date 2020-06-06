import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Box, Typography, Container } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import Copyright from './Copyright'
import Settings from './Settings'
import List from './List'
import { fetchPopularRepos } from './store/actions/repos'
import { addTodo } from './store/actions'

export default function App() {
  const popularRepos = useSelector((state) => state.repos.list)
  const loading = useSelector((state) => state.repos.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPopularRepos())
  }, [dispatch])

  const [starred, setStarred] = useState([])

  useEffect(() => {
    try {
      const savedStarsString = window.localStorage.getItem('starred')
      const savedStars = JSON.parse(savedStarsString)
      setStarred(savedStars)
    } catch {
      console.error('Error parsing the starred repos saved in local storage.')
    }
  }, [])

  const [starredInfos, setStarredInfos] = useState([])

  useEffect(() => {
    async function getStarredRepoDetails() {
      // wait until loading of popular data is done
      if (loading) {
        return
      }

      if (starred.length === 0) {
        return
      }

      // retrieve data from popular results: avoids uncessary fetch when repo is starred.
      const retrievedData = retrieveDataFromPopularResults()
      setStarredInfos((prev) => [...prev, ...retrievedData])

      // load only the missing pieces
      const fetchedData = await fetchMissingData(retrievedData)
      if (fetchedData) {
        setStarredInfos((prev) => [...prev, ...fetchedData])
      }

      function getMissingFullnames(object) {
        const availableStarredfullNames = object.map((el) => el.full_name)
        const missingStarInfos = starred.filter(
          (fullName) => !availableStarredfullNames.includes(fullName)
        )
        return missingStarInfos
      }

      function retrieveDataFromPopularResults() {
        const missingStarInfos = getMissingFullnames(starredInfos)
        const retrievedData = []
        const availableReposbyFullName = popularRepos.map(
          (repo) => repo.full_name
        )
        missingStarInfos.forEach((missingInfo) => {
          if (availableReposbyFullName.includes(missingInfo)) {
            const repoData = popularRepos.find(
              (repo) => repo.full_name === missingInfo
            )
            retrievedData.push(repoData)
          }
        })
        return retrievedData
      }

      async function fetchMissingData(retrievedData) {
        const futureStarredInfos = [...starredInfos, ...retrievedData]

        const missingStarInfos = getMissingFullnames(futureStarredInfos)

        const requests = missingStarInfos.map((fullName) =>
          fetch(`https://api.github.com/repos/${fullName}`)
        )
        try {
          const rawResponseArray = await Promise.all(requests)
          const pendingResults = rawResponseArray.map((result) => result.json())
          const results = await Promise.all(pendingResults)
          return results
        } catch (e) {
          console.error(e)
        }
      }
    }
    getStarredRepoDetails()
  }, [starred, loading])

  const toggleStar = (fullName) => {
    const isRemove = starred.includes(fullName)
    const updatedStars = isRemove
      ? starred.filter((el) => el !== fullName)
      : [...starred, fullName]

    setStarred(updatedStars)
    window.localStorage.setItem('starred', JSON.stringify(updatedStars))
  }

  const classes = useStyles()

  const [currentTab, setCurrentTab] = React.useState('trending')

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
          <List
            data={popularRepos}
            loading={loading}
            onStarClick={toggleStar}
            starred={starred}
          />
        </TabPanel>
        <TabPanel value={currentTab} index="favorites">
          <List
            data={starredRepos}
            loading={loading}
            onStarClick={toggleStar}
            starred={starred}
          />
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
