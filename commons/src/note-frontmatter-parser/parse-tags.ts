/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const parseTags = (rawTags: string | string[]): string[] => {
  return (typeof rawTags === 'object' ? rawTags : rawTags.split(','))
    .map((entry) => entry.trim())
    .filter((tag) => !!tag)
}
