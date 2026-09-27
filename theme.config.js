export default {
  titleSuffix: ' — lovyloyv',
  head: ({ title, meta }) => {
    const description = meta.description ||
      'Personal site of lovyloyv.'

    return (
      <>
        <meta name="description" content={description} />
        <meta property="og:site_name" content="lovyloyv" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </>
    )
  },
  footer: (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} lovyloyv</p>
    </footer>
  ),
  navs: [{ url: 'https://github.com/lovyloyv', name: 'GitHub' }],
  readMore: '',
  darkMode: true
}
