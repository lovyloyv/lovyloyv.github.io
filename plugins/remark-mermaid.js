// Keep Mermaid fences editable as Markdown and render them with a React component.
module.exports = function remarkMermaid({ component }) {
  return (tree) => {
    let hasDiagrams = false

    function transform(node) {
      if (!node.children) return
      node.children = node.children.map((child) => {
        if (child.type === 'code' && child.lang === 'mermaid') {
          hasDiagrams = true
          return {
            type: 'mdxJsxFlowElement',
            name: 'NextraMermaidDiagram',
            // An expression preserves newlines; JSX string attributes fold them.
            attributes: [{
              type: 'mdxJsxAttribute',
              name: 'chart',
              value: {
                type: 'mdxJsxAttributeValueExpression',
                value: JSON.stringify(child.value),
                data: {
                  estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [{
                      type: 'ExpressionStatement',
                      expression: { type: 'Literal', value: child.value },
                    }],
                  },
                },
              },
            }],
            children: [],
          }
        }
        transform(child)
        return child
      })
    }

    transform(tree)
    if (!hasDiagrams) return

    tree.children.unshift({
      type: 'mdxjsEsm',
      value: `import NextraMermaidDiagram from ${JSON.stringify(component)}`,
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [{
            type: 'ImportDeclaration',
            specifiers: [{
              type: 'ImportDefaultSpecifier',
              local: { type: 'Identifier', name: 'NextraMermaidDiagram' },
            }],
            source: { type: 'Literal', value: component },
          }],
        },
      },
    })
  }
}
