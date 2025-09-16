/**
 * MDX Components Index
 *
 * @description Central export file for all MDX components and utilities.
 * Provides component mapping for MDX rendering and utility functions for dynamic component compilation.
 * Used by the MDX processing system to make components available within markdown content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/* eslint-disable no-new-func */
/* eslint-disable camelcase */

import React from 'react';
import * as _jsx_runtime from 'react/jsx-runtime';
import ReactDOM from 'react-dom';

import CustomLink from '@/components/elements/Link';
import { BlogNewsletterForm } from '@/components/forms/NewsletterForm';
import Aside from '@/components/mdx/Aside';
import Callout from '@/components/mdx/Callout';
import CitationPopover from '@/components/mdx/CitationPopover';
import Details from '@/components/mdx/Details';
import Faq from '@/components/mdx/Faq';
import FileTree from '@/components/mdx/FileTree';
import Highlight from '@/components/mdx/Highlight';
import Image from '@/components/mdx/Image';
import InternalPreview from '@/components/mdx/InternalPreview';
import PostImage from '@/components/mdx/PostImage';
import Pre from '@/components/mdx/Pre';
import Preview from '@/components/mdx/Preview';
import Quote from '@/components/mdx/Quote';
import Stats from '@/components/mdx/Stats';
import Table, { TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@/components/mdx/Table';
import Tooltip from '@/components/mdx/Tooltip';

/**
 * Collection of all available MDX components
 * Maps component names to their implementations for use in MDX content
 */
export const MDXComponents = {
  Aside,
  BlogNewsletterForm,
  Callout,
  CitationPopover,
  Details,
  Faq,
  FileTree,
  Highlight,
  Image,
  InternalPreview,
  PostImage,
  Preview,
  Quote,
  Stats,
  Table,
  Tooltip,
  'a': CustomLink,
  'pre': Pre,
  'table': Table,
  'tbody': TableBody,
  'td': TableCell,
  'th': TableHeaderCell,
  'thead': TableHead,
  'tr': TableRow
};

/**
 * Dynamically creates an MDX component from compiled code
 *
 * @param {string} code - The compiled MDX code string
 * @param {Object} [globals={}] - Additional global variables to make available
 * @returns {React.Component} The MDX component ready for rendering
 */
const getMDXComponent = (code, globals = {}) => {
  const scope = { React, ReactDOM, _jsx_runtime, ...globals };
  const fn = new Function(...Object.keys(scope), code);

  return fn(...Object.values(scope)).default;
};

/**
 * React hook for memoized MDX component creation
 *
 * @param {string} code - The compiled MDX code string
 * @param {Object} [globals={}] - Additional global variables to make available
 * @returns {React.Component} Memoized MDX component
 */
export const useMDXComponent = (
  code,
  globals = {}
) => React.useMemo(() => getMDXComponent(code, globals), [ code, globals ]);

/**
 * MDX layout renderer component
 *
 * @param {Object} props - Component props
 * @param {string} props.code - The compiled MDX code to render
 * @param {Object} [props.components] - Custom component overrides
 * @returns {JSX.Element} The rendered MDX content
 * @param {...Object} props.rest - Additional props passed to the MDX component
 */
export const MDXLayoutRenderer = ({ code, components, ...rest }) => {
  const Mdx = useMDXComponent(code);

  return <Mdx components={ components } { ...rest } />;
};
