import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from './mdx'
import kebabCase from './utils/kebabCase'

const root = process.cwd()

export async function getAllCategories(type) {
  const files = await getFiles(type)

  let categoriesCount = {}

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'data', type, file), 'utf8')
    const { data } = matter(source)
    if (data.category && data.draft !== true) {
      const formattedCategory = kebabCase(data.category)

      if (categoriesCount[formattedCategory]) {
        categoriesCount[formattedCategory].count = categoriesCount[formattedCategory].count + 1
      } else {
        categoriesCount[formattedCategory] = { display: data.category, count: 1 }
      }
    }
  })

  return categoriesCount
}