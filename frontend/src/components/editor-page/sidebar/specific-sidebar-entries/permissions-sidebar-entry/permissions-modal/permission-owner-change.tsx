/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { useOnInputChange } from '../../../../../../hooks/common/use-on-input-change'
import { UiIcon } from '../../../../../common/icons/ui-icon'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { Check as IconCheck } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

export interface PermissionOwnerChangeProps {
  onConfirmOwnerChange: (newOwner: string) => void
}

/**
 * Renders an input group to change the permission owner.
 *
 * @param onConfirmOwnerChange The callback to call if the owner was changed.
 */
export const PermissionOwnerChange: React.FC<PermissionOwnerChangeProps> = ({ onConfirmOwnerChange }) => {
  const { t } = useTranslation()
  const [ownerFieldValue, setOwnerFieldValue] = useState('')

  const onChangeField = useOnInputChange(setOwnerFieldValue)
  const onClickConfirm = useCallback(() => {
    onConfirmOwnerChange(ownerFieldValue)
  }, [ownerFieldValue, onConfirmOwnerChange])

  const confirmButtonDisabled = useMemo(() => {
    return ownerFieldValue.trim() === ''
  }, [ownerFieldValue])

  return (
    <InputGroup className={'me-1 mb-1'}>
      <FormControl
        value={ownerFieldValue}
        placeholder={t('editor.modal.permissions.ownerChange.placeholder') ?? undefined}
        onChange={onChangeField}
      />
      <Button
        variant='light'
        title={t('common.save') ?? undefined}
        onClick={onClickConfirm}
        className={'ms-2'}
        disabled={confirmButtonDisabled}>
        <UiIcon icon={IconCheck} />
      </Button>
    </InputGroup>
  )
}
