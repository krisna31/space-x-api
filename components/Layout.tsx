import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import dark from './img/dark.svg'
import light from './img/light.svg'

const Layout = (props: { children: any }) => {
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
  return (
    <>
      <Head>
        <title>Space X API</title>
        <meta name="description" content="Root Project Of Space X" />
        <link rel="icon" href="/favicon2.ico" />
      </Head>

      <div className="container bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col justify-between dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-600 min-h-screen min-w-full dark:text-white text-black font-Space-Grotesk">
        <>
          <nav className='flex justify-between p-2 bg-inherit'>
            <Link href="/" className='bg-white'>
              <a>
                <Image src={"/rocket.svg"} alt="rockets logo" width={32} height={32} className="cursor-pointer" />
              </a>
            </Link>
            <Link href="/">
              <h1 className='font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 cursor-pointer to-slate-900 max-h-fit'>Space X API</h1>
            </Link>
            <div className='cursor-pointer' onClick={() => {
              localStorage.theme = isDark ? "light" : "dark"
              setIsDark(prev => !prev)
            }
            }>
              <>
                {isDark ? <Image src={dark} alt="Dark Mode" /> : <Image src={light} alt="Light Mode" />}
              </>
            </div>
          </nav>
          {props.children}
          <footer className="text-center">
            <p className='bg-gradient-to-r dark:from-sky-400 dark:to-sky-200 font-bold bg-clip-text text-transparent
            from-black to-slate-700'>Build With Next Js</p>
          </footer>
        </>
      </div>
    </>
  )
}

export default Layout