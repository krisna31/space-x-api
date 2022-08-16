import Image from "next/image"
import Link from "next/link"
import { useRouter as UseRouter } from "next/router"
import { useEffect as UseEffect, useState as UseState } from "react"

const id = (props: any) => {
  const router = UseRouter()
  const [rocket, setRocket] = UseState<any>()
  const [isDoneFetch, setisDoneFetch] = UseState(false)
  const [isErrorWhileFetch, setisErrorWhileFetch] = UseState(false)
  const [errorMessage, setErrorMessage] = UseState("")
  UseEffect(() => {
    let { id } = router.query
    id && localStorage.setItem('lastId', id.toString())
    id = id || localStorage.getItem('lastId') || ""
    const options = { method: "GET" }
    fetch(`https://api.spacexdata.com/v4/rockets/${id}`, options)
      .then(result => result.json())
      .then(rocket => {
        setRocket(rocket)
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
              <Link href={"/rockets"}><div className='cursor-pointer dark:bg-gradient-to-tr dark:from-sky-400 dark:to-indigo-900 p-1 text-sm shadow-xl rounded-sm text-black bg-gradient-to-r from-lime-200 to-lime-400'>Back</div></Link>
              <div className="flex gap-3 flex-wrap justify-center items-center">
                {
                  rocket.flickr_images.map(
                    (source: string, index: number) => <Image src={source} width={200} height={200} key={index} alt="rocket" loader={() => source} unoptimized className='rounded-lg shadow-md' priority></Image>
                  )
                }
              </div>
              <h1>Name : {rocket.name}</h1>
              <h1>Company : {rocket.company}</h1>
              <h1>Country : {rocket.country}</h1>
              <h1>Description : {rocket.description}</h1>
              <h1>Diameter : {rocket.diameter.meters} M / {rocket.diameter.feet} Feet</h1>
              <h1>Height : {rocket.height.meters} M / {rocket.height.feet} Feet</h1>
              <h1>First Flight : {rocket.first_flight}</h1>
              <h1>Succes Rate {rocket.success_rate_pct}%</h1>
              <a href={rocket.wikipedia} target="_blank" rel="noreferrer">Wikipedia Link</a>
              <h1>Thrust To Weight : {rocket.engines.thrust_to_weight}</h1>
            </div>
          :
          <h2 className="flex justify-center items-center text-4xl animate-bounce">Loading...</h2>
      }
    </>
  )
}

export default id