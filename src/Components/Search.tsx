import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { setSearchText } from '../store/slice/noteSlice'
 


const Search = () => {
  const {searchText} = useSelector((state:RootState)=>state.note)
  const dispatch = useDispatch();
  const [value, setValue] = useState('')
  return (
          
            <input type="text" placeholder='Search' className=' hidden md:flex search w-[40%] h-8.75 border rounded-full border-black dark:border-[hsl(0,0%,25%)] px-10' value={searchText} onChange={(e) => dispatch(setSearchText(e.target.value))} />
  )
}

export default Search