import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, forwardRef, useMemo, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import { gradients } from '@/utils/gradients'

 /** @jsx jsx  */
import { jsx, css } from '@emotion/react'


export const SidebarContext = createContext()

const linkStyle = (isActive) => css`
  padding: 6px 12px;
  ${isActive ? "color: #9de070; " : ""}
  ${isActive ? "border: 1px solid; " : ""}
  font-size:13px;
  :hover{
    color: #9de070;
    cursor: pointer;
  }
`

const NavItem = forwardRef(({ href, children, isActive, isPublished, fallbackHref }, ref) => {
  return (
    <li ref={ref}>
      <Link href={isPublished ? href : fallbackHref}>
        <a
          className={clsx('px-3 py-2 transition-colors duration-200 relative block rounded-md', {
            'text-indigo-00': isActive,
            'hover:text-gray-50 text-gray-100': !isActive && isPublished,
            'text-gray-400': !isActive && !isPublished,
          })}

          css={linkStyle(isActive)}
        >
          <span
            className={clsx('rounded-md absolute inset-0', {
              'opacity-0': !isActive,
            })}
          />
          <span className="relative">{children}</span>
        </a>
      </Link>
    </li>
  )
})

const getOpenMenu = (nav,router) => {
  let selectedCategory = null;
  Object.keys(nav)
    .forEach((category, i) => {
      nav[category].forEach((item, i) => {
        const isCurrentNav = item.href === router.pathname
        if (isCurrentNav) {
          selectedCategory = category;
        }
      })
    })

      return selectedCategory
}

function Nav({ nav, children, fallbackHref = false }) {
  const router = useRouter()
  const activeItemRef = useRef()
  const scrollRef = useRef()

  const [menuOpen, setMenuOpen] = useState(getOpenMenu(nav,router))
  useIsomorphicLayoutEffect(() => {
    if (activeItemRef.current) {
      const scrollRect = scrollRef.current.getBoundingClientRect()
      const activeItemRect = activeItemRef.current.getBoundingClientRect()

      const top = activeItemRef.current.offsetTop
      const bottom = top - scrollRect.height + activeItemRect.height

      if (scrollRef.current.scrollTop > top || scrollRef.current.scrollTop < bottom) {
        scrollRef.current.scrollTop =
          activeItemRef.current.offsetTop - scrollRect.height / 2 + activeItemRect.height / 2
      }
    }
  }, [router.pathname])

  return (
    <nav
      id="nav"
      ref={scrollRef}
      className="px-1 pt-6 overflow-y-auto font-medium text-base sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pt-10 lg:pb-14 sticky?lg:h-(screen-18)"
    >
      <ul>
        <TopLevelNav />
        {children}
        {nav &&
          Object.keys(nav)
            .map((category, i) => {
              let publishedItems = nav[category].filter((item) => item.published !== false)
              if (publishedItems.length === 0 && !fallbackHref) return null
              const isOpen =  (menuOpen !== null ? menuOpen === category : i === 0)
              return (
                <li key={category} className="mt-6">
                  <h5
                    onClick={() => setMenuOpen(category)}
                    className={clsx(
                      'px-3 mb-3 lg:mb-3 uppercase tracking-wide font-bold text-sm lg:text-xs cursor-pointer',
                      {
                        '': publishedItems.length > 0,
                        'text-white': publishedItems.length === 0,
                      }
                    )}
                  >
                    <div className="flex justify-between">
                    {category}
                    <ChevronRight style={isOpen ? { transform: "rotate(90deg)" } : {}}/>
                    </div>
                  </h5>
                  <ul>
                    {isOpen &&
                      (fallbackHref ? nav[category] : publishedItems).map((item, i) => (
                        <NavItem
                          key={i}
                          href={item.href}
                          isActive={item.href === router.pathname}
                          ref={item.href === router.pathname ? activeItemRef : undefined}
                          isPublished={item.published !== false}
                          fallbackHref={fallbackHref}
                        >
                          {item.shortTitle || item.title}
                        </NavItem>
                      ))}
                  </ul>
                </li>
              )
            })
            .filter(Boolean)}
      </ul>
    </nav>
  )
}

const TopLevelAnchor = forwardRef(
  ({ children, href, className, icon, isActive, onClick, color }, ref) => {
    return (
      <li>
        <a
          ref={ref}
          href={href}
          onClick={onClick}
          className={clsx(
            'flex items-center px-3 hover:text-gray-100 transition-colors duration-200',
            className,
            {
              'text-gray-100': isActive,
            }
          )}
        >
          <div className={`mr-3 rounded-md bg-gradient-to-br ${gradients[color][0]}`}>
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              {icon}
            </svg>
          </div>
          {children}
        </a>
      </li>
    )
  }
)

function TopLevelLink({ href, as, ...props }) {
  if (/^https?:\/\//.test(href)) {
    return <TopLevelAnchor href={href} {...props} />
  }

  return (
    <Link href={href} as={as} passHref>
      <TopLevelAnchor {...props} />
    </Link>
  )
}

function TopLevelNav() {
  let { pathname } = useRouter()
  let current = pathname.split('/')[1]

  const backIcon = useMemo((props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14.72}
        height={14.72}
        viewBox="0 0 873.72 873.72"
        style={{ marginLeft: 10 }}
        {...props}
      >
        <path
          d="M221.325 149.981c-20.379-20.625-53.62-20.824-74.245-.445L15.6 279.448a52.501 52.501 0 00-.445 74.245l131.682 133.271c10.27 10.396 23.804 15.601 37.347 15.601 13.329 0 26.667-5.046 36.898-15.155 20.625-20.379 20.825-53.62.446-74.245l-42.677-43.191H607.38c88.963 0 161.34 72.377 161.34 161.34v4.319c0 43.097-16.781 83.611-47.255 114.084-20.502 20.502-20.502 53.744 0 74.246 10.252 10.252 23.687 15.377 37.123 15.377 13.435 0 26.873-5.127 37.123-15.377 50.305-50.305 78.009-117.188 78.009-188.331v-4.319c0-71.143-27.704-138.026-78.009-188.332-50.305-50.305-117.189-78.009-188.331-78.009H179.641l41.238-40.747c20.626-20.379 20.825-53.619.446-74.244z"
          fill="#5f6269"
        />
      </svg>
    )
  }, [])
  return (
    <>
      <li>
        <a
          href="/docs"
          class="flex items-center hover:text-gray-50 transition-colors duration-200 mb-4 text-white"
        >
          {backIcon}
          <div class="mr-3 px-1 rounded-md bg-gradient-to-br from-pink-500 to-rose-500"></div>Go to
          main site
        </a>
      </li>
      {/*<TopLevelLink*/}
      {/*  href="/docs"*/}
      {/*  isActive={current === '' || current === 'docs'}*/}
      {/*  color="pink"*/}
      {/*  className="mb-4"*/}
      {/*  icon={*/}
      {/*    <>*/}
      {/*      <path*/}
      {/*        fillRule="evenodd"*/}
      {/*        clipRule="evenodd"*/}
      {/*        d="M9 6C10.0929 6 11.1175 6.29218 12 6.80269V16.8027C11.1175 16.2922 10.0929 16 9 16C7.90714 16 6.88252 16.2922 6 16.8027V6.80269C6.88252 6.29218 7.90714 6 9 6Z"*/}
      {/*        fill="#FFF1F2"*/}
      {/*      />*/}
      {/*      <path*/}
      {/*        fillRule="evenodd"*/}
      {/*        clipRule="evenodd"*/}
      {/*        d="M15 6C16.0929 6 17.1175 6.29218 18 6.80269V16.8027C17.1175 16.2922 16.0929 16 15 16C13.9071 16 12.8825 16.2922 12 16.8027V6.80269C12.8825 6.29218 13.9071 6 15 6Z"*/}
      {/*        fill="#FECDD3"*/}
      {/*      />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*>*/}
      {/*  Documentation*/}
      {/*</TopLevelLink>*/}
      {/*<TopLevelLink*/}
      {/*  href="/company"*/}
      {/*  color="violet"*/}
      {/*  className="mb-4"*/}
      {/*  icon={*/}
      {/*    <>*/}
      {/*      <path d="M6 9l6-3 6 3v6l-6 3-6-3V9z" fill="#F5F3FF" />*/}
      {/*      <path d="M6 9l6 3v6l-6-3V9z" fill="#DDD6FE" />*/}
      {/*      <path d="M18 9l-6 3v6l6-3V9z" fill="#C4B5FD" />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*>*/}
      {/*  Company*/}
      {/*</TopLevelLink>*/}
    </>
  )
}

export function SidebarLayout({ children, navIsOpen, setNavIsOpen, nav, sidebar, fallbackHref }) {
  return (
    <SidebarContext.Provider value={{ nav, navIsOpen, setNavIsOpen }}>
      <div className="w-full mx-auto">
        <div className="lg:flex">
          <div
            id="sidebar"
            onClick={() => setNavIsOpen(false)}
            className={clsx(
              'fixed z-40 inset-0 flex-none  h-full text-white w-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-4 lg:w-60 xl:w-72 lg:block bg-gray-1000',
              {
                hidden: !navIsOpen,
              }
            )}
            style={{background: "#0a0c0e", borderRight: "1px solid #0a0c0e !important", minHeight: "calc(100vh - 00px)", }}
          >
            <div
              id="navWrapper"
              onClick={(e) => e.stopPropagation()}
              className="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:bg-transparent overflow-hidden lg:top-18 bg-white mr-24 lg:mr-0"
            >
              {/* <div className="hidden lg:block h-12 pointer-events-none absolute inset-x-0 z-10 bg-gradient-to-b from-white" /> */}
              <Nav nav={nav} fallbackHref={fallbackHref}>
                {sidebar}
              </Nav>
            </div>
          </div>
          <div
            id="content-wrapper"
            className={clsx(
              'min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible',
              {
                'overflow-hidden max-h-screen fixed': navIsOpen,
              }
            )}
            style={{paddingTop: 80,boxShadow: "-8px 0px 07px 08px #ffffff01;", zIndex: 50}}
          >
            {children}
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}


export function ChevronRight(props) {
	return (
		<svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g clipPath="url(#prefix__clip0)">
				<path
					d="M7.065 4.5a.628.628 0 01-.185.446l-3.87 3.87a.63.63 0 11-.89-.892L5.542 4.5 2.12 1.076a.63.63 0 01.892-.891l3.87 3.87a.628.628 0 01.184.445z"
					fill="#BDBDBD"
					fillOpacity={0.7}
				/>
			</g>
			<defs>
				<clipPath id="prefix__clip0">
					<path fill="#fff" transform="rotate(-90 4.5 4.5)" d="M0 0h9v9H0z" />
				</clipPath>
			</defs>
		</svg>
	);
}
