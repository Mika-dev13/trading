import { useState, useEffect, useContext } from 'react'
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/WatchListContext'

export const AutoComplete = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const { addStock } = useContext(WatchListContext)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/search', {
          params: {
            q: search,
          },
        })
        console.log(response)
        isMounted && setResults(response.data.result)
      } catch (err) {}
    }

    search.length > 0 ? fetchData() : setResults([])

    return () => (isMounted = false)
  }, [search])
  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: 'rgba(145,158,171,0.04)' }}
          type="text"
          id="search"
          className="form-control"
          placeholder="search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        <ul
          style={{
            height: '500px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            cursor: 'pointer',
            width: '100%',
          }}
          className={`dropdown-menu ${search ? 'show' : ''}`}
        >
          {results.map((result) => {
            return (
              <li
                onClick={() => {
                  addStock(result.symbol)
                  setSearch('')
                }}
                className="dropdown-item"
                key={result.symbol}
              >
                {result.description} ({result.symbol})
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
