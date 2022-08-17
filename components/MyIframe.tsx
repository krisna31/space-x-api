import React from 'react'

const MyIframe = ({ id }: { id: string }) => {
  return (
    <iframe width="333" height="216" src={`https://www.youtube.com/embed/${id}`} allowFullScreen></iframe>
  )
}

export default MyIframe