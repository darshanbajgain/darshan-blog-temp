'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  language: string
  code: string
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copyToClipboard = async () => {
    if (!codeRef.current) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)

      // Reset copied state after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div className="relative group">
      <pre
        ref={codeRef}
        className={`language-${language}`}
        data-language={language}
      >
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: code }} />
        <button
          type="button"
          onClick={copyToClipboard}
          className="copy-button"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1 inline" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1 inline" />
              <span>Copy</span>
            </>
          )}
        </button>
      </pre>
    </div>
  )
}
