import { useState, useEffect } from 'react'
import finnHub from '../apis/finnHub'
export const StockList = () => {
  const [stock, setStock] = useState([])
  const [watchList, setWatchList] = useState(['GOOGL', 'MSFT', 'AMZN'])

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get('/quote', {
              params: {
                symbol: stock,
              },
            })
          })
        )

        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          }
        })
        console.log(data)
        if (isMounted) {
          setStock(data)
        }
      } catch {}
    }
    fetchData()
    return () => (isMounted = false)
  }, [])

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: 'rgb(79,89,102)' }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            return (
              <tr className="table-row" key={stockData.symbol}>
                <th scope="row">{stockData.symbol}</th>
                <td className={`text-${stockData.data.c < 0 && 'danger'}`}>
                  {stockData.data.c}
                </td>
                <td className={`text-${stockData.data.d < 0 && 'danger'}`}>
                  {stockData.data.d}
                </td>
                <td className={`text-${stockData.data.dp < 0 && 'danger'}`}>
                  {stockData.data.dp}
                </td>
                <td className={`text-${stockData.data.h < 0 && 'danger'}`}>
                  {stockData.data.h}
                </td>
                <td className={`text-${stockData.data.l < 0 && 'danger'}`}>
                  {stockData.data.l}
                </td>
                <td className={`text-${stockData.data.o < 0 && 'danger'}`}>
                  {stockData.data.o}
                </td>
                <td className={`text-${stockData.data.pc < 0 && 'danger'}`}>
                  {stockData.data.pc}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
