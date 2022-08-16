import Image from "next/image"
import Link from "next/link"
import { useRouter as UseRouter } from "next/router"
import { useEffect as UseEffect, useState as UseState } from "react"

const id = (props: any) => {
  const router = UseRouter()
  const [ships, setShips] = UseState<any>()
  const [isDoneFetch, setisDoneFetch] = UseState(false)
  const [isErrorWhileFetch, setisErrorWhileFetch] = UseState(false)
  const [errorMessage, setErrorMessage] = UseState("")
  UseEffect(() => {
    let { id } = router.query
    id && localStorage.setItem('lastId', id.toString())
    id = id || localStorage.getItem('lastId') || ""
    const options = { method: "GET" }
    fetch(`https://api.spacexdata.com/v4/ships/${id}`, options)
      .then(result => result.json())
      .then(ships => {
        setShips(ships)
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
              <Link href={"/ships"}><div className='cursor-pointer dark:bg-gradient-to-tr dark:from-sky-400 dark:to-indigo-900 p-1 text-sm shadow-xl rounded-sm text-black bg-gradient-to-r from-lime-200 to-lime-400'>Back</div></Link>
              <div className="flex gap-3 flex-wrap justify-center items-center">
                <Image src={ships.image} width={200} height={200} alt="ships" loader={() => ships.image} unoptimized className='rounded-lg shadow-md' priority></Image>
              </div>
              <h1>Name : {ships.name}</h1>
              <p className='text-justify text-sm mb-3'>Home Port : {ships.home_port}</p>
              <p className='text-justify text-sm mb-3'>Year Built : {ships.year_built}</p>
              <p className='text-justify text-sm mb-3'>{ships.active ? "Active" : "Not Active"}</p>
              <p className='text-justify text-sm mb-3'>Mass : {ships.mass_kg} kg / {ships.mass_lbs} lbs</p>
              <p className='text-justify text-sm mb-3'>Roles : {ships.roles.join(", ")}</p>
              <p className='text-justify text-sm mb-3'>Type : {ships.type}</p>
              {ships.launches.map((e: any, i: number) => {
                return (
                  <Link href={`/launches/${e}`} key={i}>
                    <p className='text-justify text-sm mb-3 cursor-pointer underline'>{`Launch Link ${i + 1}`}</p>
                  </Link>
                )
              })}
            </div>
          :
          <h2 className="flex justify-center items-center text-4xl animate-bounce">Loading...</h2>
      }
    </>
  )
}

export default id