/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ParserOptions } from '@hedgedoc/html-to-react'
import { convertHtmlToReact } from '@hedgedoc/html-to-react'
import type DOMPurify from 'dompurify'
import { sanitize } from 'dompurify'
import React, { Fragment, useMemo } from 'react'

export interface HtmlToReactProps {
  htmlCode: string
  domPurifyConfig?: DOMPurify.Config
  parserOptions?: ParserOptions
}

/**
 * Renders
 * @param htmlCode
 * @param domPurifyConfig
 * @param parserOptions
 * @constructor
 */
export const HtmlToReact: React.FC<HtmlToReactProps> = ({ htmlCode, domPurifyConfig, parserOptions }) => {
  const elements = useMemo(() => {
    const sanitizedHtmlCode = sanitize(htmlCode, { ...domPurifyConfig, RETURN_DOM_FRAGMENT: false, RETURN_DOM: false })
    return convertHtmlToReact(sanitizedHtmlCode, parserOptions)
  }, [domPurifyConfig, htmlCode, parserOptions])

  return <Fragment>{elements}</Fragment>
}
