import { useState, useEffect, useContext } from 'react'
import finnHub from '../apis/finnHub'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { WatchListContext } from '../context/WatchListContext'
import { useNavigate } from 'react-router-dom'

export const StockList = () => {
  const [stock, setStock] = useState([])
  const { watchList } = useContext(WatchListContext)
  const navigate = useNavigate()

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
  }, [watchList])

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }
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
              <tr
                style={{ cursor: 'pointer' }}
                className="table-row"
                key={stockData.symbol}
                onClick={() => handleStockSelect(stockData.symbol)}
              >
                <th scope="row">{stockData.symbol}</th>
                <td className={`text-${stockData.data.c < 0 && 'danger'}`}>
                  {stockData.data.c}
                  {stockData.data.c < 0 && <BsFillCaretDownFill />}
                </td>
                <td className={`text-${stockData.data.d < 0 && 'danger'}`}>
                  {stockData.data.d}
                  {stockData.data.d < 0 && <BsFillCaretDownFill />}
                </td>
                <td className={`text-${stockData.data.dp < 0 && 'danger'}`}>
                  {stockData.data.dp}
                  {stockData.data.dp < 0 && <BsFillCaretDownFill />}
                </td>
                <td className={`text-${stockData.data.h < 0 && 'danger'}`}>
                  {stockData.data.h}
                  {stockData.data.h < 0 && <BsFillCaretDownFill />}
                </td>
                <td className={`text-${stockData.data.l < 0 && 'danger'}`}>
                  {stockData.data.l}
                  {stockData.data.l < 0 && <BsFillCaretDownFill />}
                </td>
                <td className={`text-${stockData.data.o < 0 && 'danger'}`}>
                  {stockData.data.o}
                  {stockData.data.o < 0 && <BsFillCaretDownFill />}
                </td>
                <td className={`text-${stockData.data.pc < 0 && 'danger'}`}>
                  {stockData.data.pc}
                  {stockData.data.pc < 0 && <BsFillCaretDownFill />}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
