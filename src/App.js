import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Copyright from './Copyright'
import ProTip from './ProTip'
import Settings from './Settings'
import List from './List'

export default function App() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // format to YYYY-MM-DD
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

    fetch(
      `https://api.github.com/search/repositories?q=created:>${oneWeekAgo}&sort=stars&order=desc`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.items))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false))
  }, [])

  const [starred, setStarred] = useState([])

  useEffect(() => {
    if (window && window.localStorage) {
      const savedStarsString = window.localStorage.getItem('starred')
      if (savedStarsString) {
        try {
          const savedStars = JSON.parse(savedStarsString)
          setStarred(savedStars)
        } catch {
          console.error(
            'Error parsing the starred repos saved in local storage.'
          )
        }
      }
    }
  }, [])

  const toggleStar = (id) => {
    if (starred.includes(id)) {
      setStarred(starred.filter((el) => el !== id))
    } else {
      const updatedStars = [...starred, id]
      setStarred(updatedStars)
      window.localStorage.setItem('starred', JSON.stringify(updatedStars))
    }
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Trending GitHub repositories
        </Typography>
        <ProTip />
        <Settings />
        <List
          data={results}
          loading={loading}
          onStarClick={toggleStar}
          starred={starred}
        />
        <Copyright />
      </Box>
    </Container>
  )
}
