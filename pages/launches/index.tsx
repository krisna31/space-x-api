/* eslint-disable react-hooks/rules-of-hooks */
import { GetStaticProps } from 'next'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { CARDSHOWPERPAGE } from '../../const';

const launches: NextPage<any> = (props) => {
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [begin, setBegin] = useState(0)
  const [end, setEnd] = useState(30)
  useEffect(() => {
    setTotalPage(prev => Math.ceil(props.launches.length / CARDSHOWPERPAGE))
    setBegin(prev => CARDSHOWPERPAGE * pageNumber > props.launches.length ? props.launches.length - 30 : CARDSHOWPERPAGE * pageNumber)
    setEnd(prev => CARDSHOWPERPAGE * (pageNumber + 1) > props.launches.length ? props.launches.length : CARDSHOWPERPAGE * (pageNumber + 1))
  }, [props.launches.length, pageNumber])
  return (
    <>
      {
        props.error ? <h1 className="flex justify-center items-center text-2xl text-red-500 text-center">Please Tell Developer Error Has Happened With Messsage :  {props.err}</h1>
          :
          <div className='flex gap-6 flex-col justify-center items-center m-3 mt-0'>
            <h1 className='text-xl font-bold dark:bg-gradient-to-br dark:from-red-400 dark:to-red-700 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>List Of Launches</h1>
            <div className='flex gap-2 justify-evenly'>
              {[...Array(totalPage)].map((element, index) => {
                return (
                  index === pageNumber ? <span className='cursor-pointer text-base hover:text-red-600 text-red-600 dark:text-green-500' key={index} onClick={e => setPageNumber(prev => index)}>{index + 1}</span> : <span className='cursor-pointer text-base hover:text-red-600' key={index} onClick={e => setPageNumber(prev => index)}>{index + 1}</span>
                )
              })}
            </div>
            <h1 className='max-w-fit text-sm cursor-default'>{`Showing From ${begin === 0 ? begin + 1 : begin} - ${end}`}</h1>
            {props.launches.map(
              (launch: any, index: number) => {
                return (
                  index >= end || index <= begin - 2 ? <React.Fragment key={launch.id}></React.Fragment> : <React.Fragment key={launch.id}>
                    <div className='flex flex-col justify-center items-center gap-1 cursor-default w-3/4 lg:w-1/2 lg:px-8'>
                      <h1 className='max-w-fit text-xl mb-3'>{index + 1}. {launch.name}</h1>
                      <div className='flex flex-wrap justify-center items-center gap-1'>
                        {launch.links.patch.small && <Image src={launch.links.patch.small} width={230} height={230} alt="launch" loader={() => launch.links.patch.small} unoptimized />}
                      </div>
                      <p className='text-justify text-sm mb-3'>Launch {launch.success ? "Succes" : "Failed"}</p>
                      <p className='text-justify text-sm mb-3'>{launch.details}</p>
                      <Link href={`/launches/${launch.id}`}>
                        <div className='cursor-pointer dark:bg-gradient-to-tr dark:from-sky-400 dark:to-indigo-900 p-1 text-sm shadow-xl rounded-sm text-black bg-gradient-to-r from-lime-200 to-lime-400'>More Details</div>
                      </Link>
                    </div>
                  </React.Fragment>
                )
              })}
          </div>
      }
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let errorCatch = "Something Wrong Here"
  try {
    const options = { method: "GET" }
    const result = await fetch("https://api.spacexdata.com/v5/launches", options)
    const launches = await result.json()
    if (!launches) return {
      props: {
        error: true,
        err: errorCatch
      }
    }
    return {
      props: {
        launches,
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

export default launches