import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs',
);

const gettingStartedPages = createPageList(
  require.context(`../pages/docs/getting-started/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/getting-started'
)

const sdkPages = createPageList(
  require.context(`../pages/docs/sdk/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/sdk'
)


const referencesPages = createPageList(
  require.context(`../pages/docs/references/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/references',
)


console.log(gettingStartedPages)

export const documentationNav = {
  'Getting Started': [
    gettingStartedPages['downloading-crusher-recorder'],
    gettingStartedPages['creating-first-test'],
  ],
  'SDK': [
    sdkPages['reference']
  ],
  // 'Tutorials': [
  //   pages['installation'],
  //   ],
  // 'Features': [
  //   pages['installation'],
  // ],
  // 'Deploying': [
  //   pages['installation'],
  // ],
  // 'Contributing': [pages['installation'],],
  'References': [
    referencesPages['pricing'],
    referencesPages['contact-us'],
    {
      title: 'Release Notes',
      href: 'https://github.com/crusherdev/crusher/releases',
    },

  ]
}
