import React from 'react'

interface SidebarProps{
  isOpen: boolean;
}

const sideElements =[
  {
    icon: 'ai',
    name: 'this is name'
  },
  {
    icon: 'ai',
    name: 'this is name'
  },
  {
    icon: 'ai',
    name: 'this is name'
  },
]

const Sidebar:React.FC<SidebarProps> = ({isOpen}) => {
  return (
    <div className={`h-full flex flex-col justify-start p-5 ${isOpen ? 'w-[20%]' : 'w-auto'}`}>
        {sideElements.map((sideElement)=>(
          <div className='flex flex-row px-2 py-1 gap-2' key={sideElement.icon}>
          <h1>{sideElement.icon}</h1>
          {isOpen && <h1>{sideElement.name}</h1>}
          </div>
      ))}
    </div>
  )
}

export default Sidebar