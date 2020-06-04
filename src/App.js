import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Copyright from './Copyright'
import ProTip from './ProTip'
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
      .then((data) => {
        setResults(data.items)
        setLoading(false)
      })
  }, [])

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          GitHub trending repositories
        </Typography>
        <ProTip />
        <List data={results} loading={loading} />
        <Copyright />
      </Box>
    </Container>
  )
}
