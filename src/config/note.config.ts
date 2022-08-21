/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import { DefaultAccessPermission } from './default-access-permission.enum';
import { buildErrorMessage, parseOptionalNumber, toArrayConfig } from './utils';

export interface NoteConfig {
  forbiddenNoteIds: string[];
  maxDocumentLength: number;
  permissions: {
    accessDefault: {
      everyone: DefaultAccessPermission;
      loggedIn: DefaultAccessPermission;
    };
  };
}

const schema = Joi.object<NoteConfig>({
  forbiddenNoteIds: Joi.array()
    .items(Joi.string())
    .optional()
    .default([])
    .label('HD_FORBIDDEN_NOTE_IDS'),
  maxDocumentLength: Joi.number()
    .default(100000)
    .positive()
    .integer()
    .optional()
    .label('HD_MAX_DOCUMENT_LENGTH'),
  permissions: {
    accessDefault: {
      everyone: Joi.string()
        .valid(...Object.values(DefaultAccessPermission))
        .optional()
        .default(DefaultAccessPermission.READ)
        .label('HD_PERMISSION_ACCESS_DEFAULT_EVERYONE'),
      loggedIn: Joi.string()
        .valid(...Object.values(DefaultAccessPermission))
        .optional()
        .default(DefaultAccessPermission.WRITE)
        .label('HD_PERMISSION_ACCESS_DEFAULT_LOGGED_IN'),
    },
  },
});

export default registerAs('noteConfig', () => {
  const noteConfig = schema.validate(
    {
      forbiddenNoteIds: toArrayConfig(process.env.HD_FORBIDDEN_NOTE_IDS, ','),
      maxDocumentLength: parseOptionalNumber(
        process.env.HD_MAX_DOCUMENT_LENGTH,
      ),
      permissions: {
        accessDefault: {
          everyone: process.env.HD_PERMISSION_ACCESS_DEFAULT_EVERYONE,
          loggedIn: process.env.HD_PERMISSION_ACCESS_DEFAULT_LOGGED_IN,
        },
      },
    } as NoteConfig,
    {
      abortEarly: false,
      presence: 'required',
    },
  );
  if (noteConfig.error) {
    const errorMessages = noteConfig.error.details.map(
      (detail) => detail.message,
    );
    throw new Error(buildErrorMessage(errorMessages));
  }
  return noteConfig.value;
});
