import { useRouter as UseRouter } from "next/router"
import { useEffect as UseEffect, useState as UseState } from "react"

const id = (props: any) => {
  const router = UseRouter()
  const { id } = router.query
  const [rocket, setRocket] = UseState()
  UseEffect(() => {
    const options = { method: "GET" }
    fetch("https://api.spacexdata.com/v4/rockets", options)
      .then(result => result.json())
      .then(rocket => setRocket(rocket))
  }, [])

  return (
    <div>Rocket id : {id}</div>
  )
}

export default id