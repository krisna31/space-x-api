import Image from "next/image"
import Link from "next/link"
import { useRouter as UseRouter } from "next/router"
import { useEffect as UseEffect, useState as UseState } from "react"

const id = (props: any) => {
  const router = UseRouter()
  const [launch, setLaunch] = UseState<any>()
  const [isDoneFetch, setisDoneFetch] = UseState(false)
  const [isErrorWhileFetch, setisErrorWhileFetch] = UseState(false)
  const [errorMessage, setErrorMessage] = UseState("")
  UseEffect(() => {
    let { id } = router.query
    id && localStorage.setItem('lastId', id.toString())
    id = id || localStorage.getItem('lastId') || ""
    const options = { method: "GET" }
    fetch(`https://api.spacexdata.com/v4/launches/${id}`, options)
      .then(result => result.json())
      .then(launch => {
        setLaunch(launch)
      })
      .catch(e => {
        setisErrorWhileFetch(true)
        setErrorMessage(e.message)
      })
      .finally(() => {
        setisDoneFetch(true)
      })
  }, [])

  return (
    <>
      {
        isDoneFetch ?
          isErrorWhileFetch ?
            <h1 className="flex justify-center items-center text-2xl text-red-500 text-center">Please Tell Developer Error Has Happened With Messsage :  {errorMessage}</h1>
            :
            <div className="flex flex-col justify-center items-center gap-2 mt-4 text-justify px-8 lg:px-32 mb-10">
              <Link href={"/launches"}><div className='cursor-pointer dark:bg-gradient-to-tr dark:from-sky-400 dark:to-indigo-900 p-1 text-sm shadow-xl rounded-sm text-black bg-gradient-to-r from-lime-200 to-lime-400'>Back</div></Link>
              <div className="flex gap-3 flex-wrap justify-center items-center">
                <Image src={launch.links.patch.small} width={200} height={200} alt="launch" loader={() => launch.links.patch.small} unoptimized className='rounded-lg shadow-md' priority></Image>
              </div>
              <h1 className="text-3xl">Name : {launch.name}</h1>
              <p className='text-justify text-sm'>Date Launch : {new Date(launch.date_unix * 1000).toDateString()}</p>
              <p className='text-justify text-sm'>Launch {launch.success ? "Succes" : "Failed"}</p>
              <p className='text-justify text-sm'>Details : {launch.details ?? "No Details"}</p>
              <p className='text-justify text-sm'>Article Link : <a href={launch.links.article} target="_blank" rel="noreferrer" className="cursor-pointer underline hover:text-red-600">LINK</a></p>
              <p className='text-justify text-sm'>Presskit Link : <a href={launch.links.presskit} target="_blank" rel="noreferrer" className="cursor-pointer underline hover:text-red-600">PDF</a></p>
              <p className='text-justify text-sm'>Webcast Link : <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="cursor-pointer underline hover:text-red-600">WEBCAST</a></p>
              <p className='text-justify text-sm'>Wikipedia Link : <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="cursor-pointer underline hover:text-red-600">WIKIPEDIA</a></p>
              <Link href={`/rockets/${launch.rocket}`}>
                <p className='text-justify text-sm mb-3 cursor-pointer underline hover:text-red-600'>Rocket That This Mission Use</p>
              </Link>
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${launch.links.youtube_id}`} allowFullScreen></iframe>
            </div>
          :
          <h2 className="flex justify-center items-center text-4xl animate-bounce">Loading...</h2>
      }
    </>
  )
}

export default id