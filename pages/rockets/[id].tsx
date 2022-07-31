import { useRouter as UseRouter } from "next/router"

const id = () => {
  const router = UseRouter()
  const { id } = router.query
  return (
    <div>So your id are {id}</div>
  )
}

export default id