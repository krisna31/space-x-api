import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface props {
  data: []
}

const Home: NextPage<props> = (props) => {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ?
      setIsDark(true)
      :
      setIsDark(false)
  }, [])
  useEffect(() => {
    isDark ? document.documentElement.classList.add("dark") :
      document.documentElement.classList.remove("dark")
  }, [isDark])

  return (<>
    <Head>
      <title>Space X API</title>
      <meta name="description" content="Root Project Of Space X" />
      <link rel="icon" href="/favicon2.ico" />
    </Head>

    <div className="container bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col justify-between dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-600 min-h-screen min-w-full dark:text-white text-black font-Space-Grotesk">
      <nav className='flex justify-between p-2 bg-inherit'>
        <Link href="/">
          <Image src={"/rocket.svg"} alt="rockets logo" width={32} height={32} className="cursor-pointer" />
        </Link>
        <div className='cursor-pointer' onClick={() => {
          localStorage.theme = isDark ? "light" : "dark"
          setIsDark(prev => !prev)
        }
        }>
          {isDark ? "dark" : "light"}
        </div>
      </nav>
      <main className='flex items-center flex-col grow mt-2'>
        <h1 className='font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>Welcome To Space X API by Krisna31</h1>
        <ul className='flex flex-wrap transition-all'>
          <li className='cursor-pointer bg-transparent backdrop-blur-xl my-3 hover:scale-110'>
            <Link href="/rockets">
              <div className=''>
                1. Rockets
              </div>
            </Link >
          </li>
        </ul>
      </main>

      <footer className="text-center">
        <p>Build With Love</p>
      </footer>
    </div>
  </>
  )
}

export default Home