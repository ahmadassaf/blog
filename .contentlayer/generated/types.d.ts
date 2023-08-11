// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer/core'
import * as Local from 'contentlayer/source-files'

export { isType } from 'contentlayer/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Author = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Author'
  avatar?: string | undefined
  company?: string | undefined
  email?: string | undefined
  github?: string | undefined
  layout?: string | undefined
  linkedin?: string | undefined
  name: string
  occupation?: string | undefined
  twitter?: string | undefined
  /** MDX file body */
  body: MDX
  filePath: string
  path: string
  readingTime: json
  slug: string
  toc: string
}

export type Post = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Post'
  bibliography?: string | undefined
  category: string
  date: IsoDateTimeString
  draft?: boolean | undefined
  featured?: boolean | undefined
  layout?: string | undefined
  subtitle?: string | undefined
  summary?: string | undefined
  tags: string[]
  title: string
  /** MDX file body */
  body: MDX
  filePath: string
  path: string
  readingTime: json
  slug: string
  toc: string
  structuredData: json
}

export type Project = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Project'
  bibliography?: string | undefined
  category: string
  date: IsoDateTimeString
  draft?: boolean | undefined
  featured?: boolean | undefined
  github: string
  layout: string
  subtitle?: string | undefined
  summary?: string | undefined
  tags: string[]
  title: string
  /** MDX file body */
  body: MDX
  filePath: string
  path: string
  readingTime: json
  slug: string
  toc: string
  structuredData: json
}  

/** Nested types */
  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Author | Post | Project
export type DocumentTypeNames = 'Author' | 'Post' | 'Project'

export type NestedTypes = never
export type NestedTypeNames = never

export type DataExports = {
  allDocuments: DocumentTypes[]
  allPosts: Post[]
  allAuthors: Author[]
  allProjects: Project[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Author: Author
  Post: Post
  Project: Project
}

export type NestedTypeMap = {

}

 