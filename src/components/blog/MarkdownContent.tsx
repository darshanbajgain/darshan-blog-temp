'use client'

import React, { useEffect, useRef } from 'react'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Process code blocks after render
  useEffect(() => {
    if (!contentRef.current) return

    // Find all pre > code elements
    const codeBlocks = contentRef.current.querySelectorAll('pre > code')

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement
      if (!pre) return

      // Get language from class
      const classNames = Array.from(codeBlock.classList)
      const languageClass = classNames.find(className => className.startsWith('language-'))
      const language = languageClass ? languageClass.replace('language-', '') : 'text'

      // Get the code content
      const code = codeBlock.innerHTML

      // Create a wrapper div
      const wrapper = document.createElement('div')
      wrapper.className = 'relative group'

      // Create copy button
      const copyButton = document.createElement('button')
      copyButton.className = 'copy-button'
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 mr-1 inline"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>'
      copyButton.setAttribute('aria-label', 'Copy code to clipboard')

      // Add click event to copy button
      copyButton.addEventListener('click', async (e) => {
        // Prevent the event from bubbling up
        e.stopPropagation()

        try {
          // Extract text content without HTML tags
          const tempElement = document.createElement('div')
          tempElement.innerHTML = code
          const textContent = tempElement.textContent || ''

          await navigator.clipboard.writeText(textContent)

          // Show copied state
          copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 mr-1 inline"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Copied!</span>'

          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3 mr-1 inline"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>Copy</span>'
          }, 2000)
        } catch (err) {
          console.error('Failed to copy code:', err)
        }
      })

      // Add language indicator
      pre.setAttribute('data-language', language)

      // Add copy button to pre
      pre.appendChild(copyButton)
    })

    // Add feature-list class to specific lists
    const featureLists = contentRef.current.querySelectorAll('h2 + ul, h3 + ul')
    featureLists.forEach(list => {
      list.classList.add('feature-list')
    })

  }, [content])

  return (
    <div
      ref={contentRef}
      className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary/70 prose-pre:bg-muted prose-pre:text-textPrimary/70 prose-pre:border prose-img:rounded-lg prose-code:text-textPrimary/70 prose-code:rounded prose-table:overflow-x-auto sm:prose-table:overflow-visible prose-table:w-full prose-table:my-6 prose-table:border-collapse"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
