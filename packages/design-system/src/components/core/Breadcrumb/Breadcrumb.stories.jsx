import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import { Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrail } from './Breadcrumb';

const componentDocs = getComponentDocs('Core/Breadcrumb');

export default {
  component: BreadcrumbTrail,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Breadcrumb'
};

export const Example = {
  render: () => <div className='p-6'><BreadcrumbTrail items={ [{ href: '/', label: 'Home' }, { href: '/blog', label: 'Blog' }, { current: true, label: 'Design Systems' }] } /></div>
};

export const LongTrail = {
  render: () => (
    <div className='p-6'>
      <BreadcrumbTrail
        items={ [
          { href: '/', label: 'Home' },
          { href: '/blog', label: 'Blog' },
          { href: '/blog/tags', label: 'Tags' },
          { href: '/blog/tags/design-systems', label: 'Design Systems' },
          { current: true, label: 'Core components' }
        ] }
      />
    </div>
  )
};

export const Composed = {
  render: () => (
    <div className='p-6'>
      <Breadcrumb label='Article breadcrumb'>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href='/'>Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Current article</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
};
