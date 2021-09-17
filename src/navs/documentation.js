import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs',
);

const gettingStartedPages = createPageList(
  require.context(`../pages/docs/getting-started/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/getting-started'
)


const selfHostPages = createPageList(
  require.context(`../pages/docs/self-host/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/self-host'
)

const howToPages = createPageList(
  require.context(`../pages/docs/how-to/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/how-to'
);

const sdkPages = createPageList(
  require.context(`../pages/docs/sdk/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/sdk'
)

const integrationPages = createPageList(
  require.context(`../pages/docs/integration/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/integration'
);

const managingTestsPage = createPageList(
  require.context(`../pages/docs/managing-tests/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/managing-tests'
);

const recordingTestsPage = createPageList(
  require.context(`../pages/docs/recording/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/recording'
);

const referencesPages = createPageList(
  require.context(`../pages/docs/references/?meta=title,shortTitle,published`, false, /\.mdx$/),
  'docs/references',
)




console.log(gettingStartedPages)

export const documentationNav = {
  'Getting Started': [
    gettingStartedPages['downloading-crusher-recorder'],
    // gettingStartedPages['creating-first-test'],
    // gettingStartedPages['invite-team'],
    gettingStartedPages['set-up-monitoring'],
  ],
  'Self host': [
    selfHostPages['how-to-setup-crusher-on-docker'],
    selfHostPages['hosting-cost'],
    // gettingStartedPages['creating-first-test'],
    // gettingStartedPages['invite-team'],
  ],
  // 'Crusher cloud': [
  //   gettingStartedPages['downloading-crusher-recorder'],
  //   // gettingStartedPages['creating-first-test'],
  //   // gettingStartedPages['invite-team'],
  //   gettingStartedPages['set-up-monitoring'],
  // ],
  'Recording Test': [
    recordingTestsPage['supported-actions'],
    recordingTestsPage['mobile-tests'],
    // recordingTestsPage['stable-tests'],
    // recordingTestsPage['custom-actions'],
  ],
  'Managing Tests': [
    managingTestsPage["build-report-overview"],
    // managingTestsPage["visual-diff-comparisions"],
  ],
  'SDK': [
    sdkPages['reference'],
    // sdkPages['guide']
  ],
  'How To': [
    howToPages['install-crusher-recorder'],

    // howToPages['create-custom-action'],
    // howToPages['set-cookies'],
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
