import React from 'react'
import ePub from 'epubjs'
import dynamic from 'next/dynamic'
import { ReactReader } from 'react-reader'
import { useEffect, useRef } from 'react'
export default function Reader() {
  const containerRef = React.useRef()

  const epubUrl =
    'https://www.dropbox.com/s/tmun209x3knso9k/Rattle%20of%20bones%20by%20Robert%20E.%20Howard.epub?dl=1'
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/'

  const fullUrl = corsAnywhereUrl + epubUrl

  fetch(fullUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const book = ePub(blob)

      // Render the book to a container element
      book.renderTo(containerRef.current)
    })
  const EpubReader = dynamic({
    loader: () => import('react-reader'),
    ssr: false,
    render(props, reactRe) {
      return (
        <reactRe.ReactReader
          url={epubUrl}
          title={'Alice in wonderland'}
          location={'epubcfi(/6/2[cover]!/6)'}
          locationChanged={(epubcifi) => console.log(epubcifi)}
        />
      )
    },
  })
  React.useEffect(() => {
    const book = ePub('/path/to/epub/file')
    book.renderTo(containerRef.current)
  }, [])

  return (
    <ReactReader
      url={epubUrl}
      title={'Alice in wonderland'}
      location={'epubcfi(/6/2[cover]!/6)'}
      locationChanged={(epubcifi) => console.log(epubcifi)}
    />
  )
}
