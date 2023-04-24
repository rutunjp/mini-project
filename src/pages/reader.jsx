import { ReactReader } from 'react-reader'
import { useState } from 'react'
export default function Reader() {
  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }
  return (
    <div style={{ height: '90vh' }}>
      <ReactReader
        location={location} 
        locationChanged={locationChanged}
        url="https://file.io/KX12wLhTHUdc"
      />
    </div>
  )
}