module.exports = {
  title: 'FirestormApps Docs',
  tagline: 'Documentação dos projetos internos da FirestormApps',
  url: 'https://FirestormApps.gitlab.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'firestormapps', // Usually your GitHub org/user name.
  projectName: 'FirestormApps-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'FirestormApps Docs',
      logo: {
        alt: 'FirestormApps Logo',
        src: 'img/logo_transparent.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/firestormapps',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introdução',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Redes Sociais',
          items: [
            {
              label: 'LinkedIn',
              to: 'https://www.linkedin.com/company/firestormapps',
            },
          ],
        },
        {
          title: 'Contato',
          items: [
            {
              label: 'Site Oficial',
              href: 'https://firestormapps.com.br',
            },
            {
              label: 'gustavo.kuze@firestormapps.com.br',
              href: 'mailto:gustavo.kuze@firestormapps.com.br',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FirestormApps. Feito com Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://gitlab.com/FirestormApps//-/tree/master/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://gitlab.com/FirestormApps//-/tree/master/blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
