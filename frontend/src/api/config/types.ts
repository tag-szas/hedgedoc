/*
 * SPDX-FileCopyrightText: 2023 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface FrontendConfig {
  allowAnonymous: boolean
  allowRegister: boolean
  authProviders: AuthProvider[]
  branding: BrandingConfig
  useImageProxy: boolean
  specialUrls: SpecialUrls
  version: BackendVersion
  plantumlServer?: string
  maxDocumentLength: number
}

export enum AuthProviderType {
  DROPBOX = 'dropbox',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
  GOOGLE = 'google',
  TWITTER = 'twitter',
  GITLAB = 'gitlab',
  OAUTH2 = 'oauth2',
  LDAP = 'ldap',
  SAML = 'saml',
  LOCAL = 'local'
}

export type AuthProviderTypeWithCustomName =
  | AuthProviderType.GITLAB
  | AuthProviderType.OAUTH2
  | AuthProviderType.LDAP
  | AuthProviderType.SAML

export type AuthProviderTypeWithoutCustomName =
  | AuthProviderType.DROPBOX
  | AuthProviderType.FACEBOOK
  | AuthProviderType.GITHUB
  | AuthProviderType.GOOGLE
  | AuthProviderType.TWITTER
  | AuthProviderType.LOCAL

export const authProviderTypeOneClick = [
  AuthProviderType.DROPBOX,
  AuthProviderType.FACEBOOK,
  AuthProviderType.GITHUB,
  AuthProviderType.GITLAB,
  AuthProviderType.GOOGLE,
  AuthProviderType.OAUTH2,
  AuthProviderType.SAML,
  AuthProviderType.TWITTER
]

export interface AuthProviderWithCustomName {
  type: AuthProviderTypeWithCustomName
  identifier: string
  providerName: string
}

export interface AuthProviderWithoutCustomName {
  type: AuthProviderTypeWithoutCustomName
}

export type AuthProvider = AuthProviderWithCustomName | AuthProviderWithoutCustomName

export interface BrandingConfig {
  name?: string
  logo?: string
}

export interface BackendVersion {
  major: number
  minor: number
  patch: number
  preRelease?: string
  commit?: string
}

export interface SpecialUrls {
  privacy?: string
  termsOfUse?: string
  imprint?: string
}
