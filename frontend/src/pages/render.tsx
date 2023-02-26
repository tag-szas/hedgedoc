/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { RendererToEditorCommunicatorContextProvider } from '../components/editor-page/render-context/renderer-to-editor-communicator-context-provider'
import { IframeMarkdownRenderer } from '../components/render-page/iframe-markdown-renderer'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useApplyDarkMode } from '../hooks/common/use-apply-dark-mode'

/**
 * Renders the actual markdown renderer that receives the content and meta data via iframe communication.
 */
export const RenderPage: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('bg-transparent')
    return () => document.body.classList.remove('bg-transparent')
  }, [])

  useApplyDarkMode()

  return (
    <RendererToEditorCommunicatorContextProvider>
      <IframeMarkdownRenderer />
    </RendererToEditorCommunicatorContextProvider>
  )
}

export default RenderPage
