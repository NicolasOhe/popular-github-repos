import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Copyright from './Copyright'
import ProTip from './ProTip'
import Settings from './Settings'
import List from './List'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

export default function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // format to YYYY-MM-DD
    const oneWeekAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

    fetch(
      `https://api.github.com/search/repositories?q=created:>${oneWeekAgo}&sort=stars&order=desc&per_page=10 `
    )
      .then((res) => res.json())
      .then((data) => setResults(data.items))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

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

      // retrieve data from popular results
      const retrievedData = retrieveDataFromPopularResults()
      setStarredInfos((prev) => [...prev, ...retrievedData])

      // load only the missing pieces
      const fetchedData = await fetchMissingData(retrievedData)
      setStarredInfos((prev) => [...prev, ...fetchedData])

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
        const availableReposbyFullName = results.map((repo) => repo.full_name)
        missingStarInfos.forEach((missingInfo) => {
          if (availableReposbyFullName.includes(missingInfo)) {
            const repoData = results.find(
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
        // try {
        const resultsResponse = await Promise.all(requests)
        console.log('resultsResponse', resultsResponse)
        //resultsResponse[0].json()
        const pendingResults = resultsResponse.map((result) => result.json())
        const results = await Promise.all(pendingResults)
        // } catch (e) {
        //   console.log(e)
        // }

        return results
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

  const [value, setValue] = React.useState('trending')

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const starredRepos = starredInfos.filter((el) =>
    starred.includes(el.full_name)
  )

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Trending GitHub repositories
        </Typography>
        {/* <ProTip /> */}

        <Tabs
          value={value}
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

        <TabPanel value={value} index="trending">
          <Settings />
          <List
            data={results}
            loading={loading}
            onStarClick={toggleStar}
            starred={starred}
          />
        </TabPanel>
        <TabPanel value={value} index="favorites">
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
