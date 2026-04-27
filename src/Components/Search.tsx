import React, { useState } from 'react'


const Search = () => {
  const [value, setValue] = useState('')
  return (
          
            <input type="text" placeholder='Search' className='search w-[40%] h-8.75 border rounded-full border-black dark:border-[hsl(0,0%,25%)] px-10' value={value} onChange={(e) => setValue(e.target.value)} />
  )
}

export default Search