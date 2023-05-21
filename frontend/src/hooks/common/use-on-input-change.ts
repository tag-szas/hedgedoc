/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ChangeEvent } from 'react'
import { useCallback } from 'react'

export interface InputChangeOptions {
  makeLowercase: boolean
}

/**
 * Takes an input change event and sends the event value to a state setter.
 *
 * @param setter The setter method for the state.
 * @param options Optional options for the input change.
 * @return Hook that can be used as callback for onChange.
 */
export const useOnInputChange = (
  setter: (value: string) => void,
  options: InputChangeOptions | undefined = undefined
): ((event: ChangeEvent<HTMLInputElement>) => void) => {
  return useCallback(
    (event) => {
      if (!options) {
        setter(event.target.value)
      }
      if (options && options.makeLowercase) {
        setter(event.target.value.toLowerCase())
      }
    },
    [options, setter]
  )
}
