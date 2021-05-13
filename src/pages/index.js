import { DocumentationLayout } from '@/layouts/DocumentationLayout'

import { ReactComponent as GuidesImage } from '@/img/guides.svg'

import Link from 'next/link'

import { Community } from '@/components/Community'
import styles from './index.module.css'

const whatsNew = [
  {
    title: 'Hover detection',
    version: '2.0+',
    image: require('@/img/docs/focus-ring.svg').ReactComponent,
    href: '/docs/ring-width',
  },
  {
    title: 'Multiple selector',
    version: '2.0+',
    image: require('@/img/docs/dark-mode.svg').ReactComponent,
    href: '/docs/dark-mode',
  },
  {
    title: '3+ browsers',
    version: '2.0+',
    image: require('@/img/docs/color-palette.svg').ReactComponent,
    href: '/docs/customizing-colors#color-palette-reference',
  },
  {
    title: 'Multiple configuration',
    version: '2.0+',
    image: require('@/img/docs/extend-variants.svg').ReactComponent,
    href: '/docs/configuring-variants#enabling-extra-variants',
  },
  {
    title: 'Devtools log',
    version: '2.0+',
    image: require('@/img/docs/breakpoint.svg').ReactComponent,
    href: '/docs/breakpoints',
  },
  {
    title: 'No-code UI & Flow testing ',
    image: require('@/img/docs/shareable-presets.svg').ReactComponent,
    href: '/docs/presets',
  },
  {
    title: 'Collabration',
    image: require('@/img/docs/gradients.svg').ReactComponent,
    href: '/docs/gradient-color-stops',
  },
  {
    title: 'Worflow integration',
    image: require('@/img/docs/animations.svg').ReactComponent,
    href: '/docs/animation',
  },
]



export default function DocsLandingPage() {
  return (
    <div className="px-4 sm:px-6 xl:px-8 pt-24 pb-16">
      <h1 className="text-4xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
        Getting started with Crusher
      </h1>
      <p className="text-xl tracking-tight mb-10">
        Ship HQ web software fast without wasting time ✨✨
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
      
      <section className="flex">
          <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg" style={{
            border: '2px solid #d7d7d7'
          }}>
            <div className={`w-full flex md:flex-col `}>
              <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
                <h2 className="text-xl text-pink-500 font-semibold mb-2">Read the docs</h2>
                <p className="font-medium text-gray-900  mb-4">
                  Learn how to get Tailwind set up in your project.
                </p>
                <Link href="/docs/installation">
                  <a className="mt-auto bg-pink-500 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex">
                    Browse now
                  </a>
                </Link>
              </div>
              <div className={`${styles.image} relative md:pl-6 xl:pl-8 hidden sm:block`}>
                <GuidesImage className="absolute top-6 left-6 md:static overflow-visible" />
              </div>
            </div>

          </div>
        </section>

        <section className="flex">
          <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg" style={{
            border: '2px solid #d7d7d7'
          }}>
            <div className={`w-full flex md:flex-col `}>
              <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
                <h2 className="text-xl text-blue-500 font-semibold mb-2">Company</h2>
                <p className="font-medium text-gray-900  mb-4">
                  Learn how to get Tailwind set up in your project.
                </p>
                <Link href="/docs/installation">
                  <a className="mt-auto bg-blue-500 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex">
                    Browse now
                  </a>
                </Link>
              </div>
              <div className={`${styles.image} relative md:pl-6 xl:pl-8 hidden sm:block`}>
                <GuidesImage className="absolute top-6 left-6 md:static overflow-visible" />
              </div>
            </div>

          </div>
        </section>

        {/* <section className="flex">
          <div className="w-full relative text-white overflow-hidden rounded-3xl flex shadow-lg" style={{
            border: '2px solid #d7d7d7'
          }}>
            <div className={`w-full flex md:flex-col `}>
              <div className="sm:max-w-sm sm:flex-none md:w-auto md:flex-auto flex flex-col items-start relative z-10 p-6 xl:p-8">
                <h2 className="text-xl text-violet-500 font-semibold mb-2">Resources</h2>
                <p className="font-medium text-gray-900  mb-4">
                  Learn how to get Tailwind set up in your project.
                </p>
                <Link href="/docs/installation">
                  <a className="mt-auto bg-violet-500 hover:bg-opacity-75 transition-colors duration-200 rounded-xl font-semibold py-2 px-4 inline-flex">
                    Browse now
                  </a>
                </Link>
              </div>
              <div className={`${styles.image} relative md:pl-6 xl:pl-8 hidden sm:block`}>
                <GuidesImage className="absolute top-6 left-6 md:static overflow-visible" />
              </div>
            </div>

          </div>
        </section> */}

       </div>
      <section>
        <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 mt-16 mb-8">
          Crusher features
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 font-semibold text-gray-900 text-center">
          {whatsNew.map((item) => (
            <li key={item.title} className="flex">
              <Link href={item.href}>
                <a className="relative rounded-xl ring-1 ring-black ring-opacity-5 shadow-sm w-full pt-8 pb-6 px-6">
                  {item.image && <item.image className="h-auto max-w-full mx-auto mb-3" />}
                  {item.title}
                  {item.version && (
                    <span className="absolute top-2 right-2 bg-fuchsia-100 text-fuchsia-600 rounded-full text-xs py-0.5 px-2">
                      {item.version}
                    </span>
                  )}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl tracking-tight font-extrabold text-gray-900 mt-16 mb-8">
          Get involved
        </h2>
        <Community />
      </section>
    </div>
  )
}

DocsLandingPage.layoutProps = {
  meta: {
    title: 'Documentation',
  },
  Layout: DocumentationLayout,
}
