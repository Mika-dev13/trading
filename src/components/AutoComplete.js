import { useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'

export const AutoComplete = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

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
        isMounted && setResult(response.data.result)
      } catch (err) {}
    }

    search.length > 0 ? fetchData() : setResult([])

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
        <ul className="dropdown-menu">
          <li>Stock1</li>
          <li>Stock2</li>
          <li>Stock3</li>
        </ul>
      </div>
    </div>
  )
}
