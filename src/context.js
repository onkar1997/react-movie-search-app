import React, {createContext, useContext, useEffect, useState} from 'react'

const AppContext = createContext()

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState([])
  const [error, setError] = useState({ show: "false", msg: "" })
  const [query, setQuery] = useState('batman')

  const getMovies = async (url) => {
    setLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()
      console.log(data)

      if (data.Response === "True") {
        setLoading(false)
        setError({
          show: false,
          msg: "",
        })
        setMovie(data.Search)
      } else {
        setError({
          show: true,
          msg: data.Error,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    let timeOut = setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`)
    }, 700)

    return () => clearTimeout(timeOut)
  }, [query])
  

  return <AppContext.Provider value={{ loading, error, movie, query, setQuery }}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppProvider, useGlobalContext}