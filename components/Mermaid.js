import { useEffect, useId, useState } from 'react'

export default function Mermaid({ chart }) {
  const reactId = useId()
  const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9-]/g, '')}`
  const [result, setResult] = useState(null)

  useEffect(() => {
    let disposed = false
    let revision = 0

    async function render() {
      const current = ++revision
      try {
        // Load only in the browser so Next.js can also export this page statically.
        const [{ default: mermaid }] = await Promise.all([
          import('mermaid'),
          document.fonts.ready,
        ])
        if (disposed || current !== revision) return

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          suppressErrorRendering: true,
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
          fontFamily: 'Inter var, system-ui, sans-serif',
          flowchart: { useMaxWidth: false },
          sequence: { useMaxWidth: false },
        })
        const { svg } = await mermaid.render(`${id}-${current}`, chart)
        if (!disposed && current === revision) setResult({ svg })
      } catch (error) {
        if (!disposed && current === revision) {
          setResult({ error: error instanceof Error ? error.message : String(error) })
        }
      }
    }

    render()
    const observer = new MutationObserver(render)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      disposed = true
      observer.disconnect()
    }
  }, [chart, id])

  return (
    <figure className="mermaid-diagram">
      {result?.svg ? (
        <div className="mermaid-scroll" tabIndex={0} aria-label="Diagram" dangerouslySetInnerHTML={{ __html: result.svg }} />
      ) : (
        <div>
          {result?.error && <p role="alert">Unable to render this diagram: {result.error}</p>}
          <pre><code>{chart}</code></pre>
        </div>
      )}
    </figure>
  )
}
