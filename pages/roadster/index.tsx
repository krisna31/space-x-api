import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import React from 'react'
import Image from 'next/image';

const roadster: NextPage<any> = ({ roadster, error, err }) => {
  const datee = roadster && new Date(roadster.launch_date_unix * 1000).toDateString()
  return (

    <>
      {
        error ? <h1 className="flex justify-center items-center text-2xl text-red-500 text-center">Please Tell Developer Error Has Happened With Messsage :  {err}</h1>
          :
          <div className='flex gap-6 flex-col justify-center items-center m-3 mt-0'>
            <h1 className='text-xl font-bold dark:bg-gradient-to-br dark:from-red-400 dark:to-red-700 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>Elon Musk Roadster</h1>
            <React.Fragment key={roadster.id}>
              <div className='flex flex-col justify-center items-center gap-1 cursor-default w-3/4 lg:w-1/2 lg:px-8'>
                <h1 className='max-w-fit text-xl mb-3'>{roadster.name}</h1>
                <p className='text-justify text-sm mb-3'>{roadster.details}</p>
                <p className='text-justify text-sm mb-3'>Speed : {roadster.speed_kph} kph / {roadster.speed_mph} mph</p>
                <p className='text-justify text-sm mb-3'>Earth Distance : {roadster.earth_distance_km} km / {roadster.earth_distance_mi} mil</p>
                <p className='text-justify text-sm mb-3'>Lauch Date Unix : {datee}</p>
                <p className='text-justify text-sm mb-3'>Lauch Mass : {roadster.launch_mass_kg} kg / {roadster.launch_mass_lbs} lbs</p>
                <p className='text-justify text-sm mb-3'>Mars Distance : {roadster.mars_distance_km} km / {roadster.mars_distance_mi} mil</p>
                <p className='text-justify text-sm mb-3'>Orbit Type : {roadster.orbit_type}</p>
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${roadster.video.split("/")[3]}`} allowFullScreen></iframe>
              </div>
              <div className='flex flex-wrap justify-center items-center gap-1'>
                {
                  roadster.flickr_images.map(
                    (source: string, index: number) =>
                      <Image src={source} width={230} height={230} key={index} alt="roadster" loader={() => source} unoptimized className='rounded-lg shadow-md' priority></Image>
                  )
                }
              </div>
            </React.Fragment>
          </div>
      }
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let errorCatch = "Something Wrong Here"
  try {
    const options = { method: "GET" }
    const result = await fetch("https://api.spacexdata.com/v4/roadster", options)
    const roadster = await result.json()
    if (!roadster) return {
      props: {
        error: true,
        err: errorCatch
      }
    }
    return {
      props: {
        roadster,
        notFound: false,
      }
    }
  } catch (err) {
    if (err instanceof Error) errorCatch = err.message
    return {
      props: {
        error: true,
        err: errorCatch
      }
    }
  }
}
export default roadster