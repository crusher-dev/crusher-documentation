import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs',
)


const referencesPages = createPageList(
  require.context(`../pages/docs/references/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/references',
)


console.log(referencesPages)

export const documentationNav = {
  'Main': [
    pages['download'],
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
