import Link from "next/link"

const MyLi = (
  { href, text }
    :
    { href: string, text: string }
) => {
  return (
    <li className='cursor-pointer bg-transparent my-3 text-3xl hover:text-4xl md:text-4xl md:hover:text-5xl lg:text-5xl lg:hover:text-6xl font-bold dark:bg-gradient-to-br dark:from-teal-200 dark:to-lime-200 bg-clip-text text-transparent bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900'>
      <Link href={href}>
        {text}
      </Link >
    </li>
  )
}

export default MyLi