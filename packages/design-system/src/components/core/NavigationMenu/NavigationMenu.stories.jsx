import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { StoryStage } from '../story-helpers';

import { NavigationMenu, NavigationMenuDropdown, NavigationMenuLink, NavigationMenuList, NavigationMenuPanel } from './NavigationMenu';

const componentDocs = getComponentDocs('Core/NavigationMenu');

export default {
  component: NavigationMenu,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/NavigationMenu'
};

const blogSections = [
  {
    description: 'Long-form writing, design system notes, and engineering essays.',
    href: '',
    label: 'All articles',
    meta: 'Latest first'
  },
  {
    description: 'Knowledge graphs, semantic web, linked data, and retrieval systems.',
    href: '',
    label: 'Data',
    meta: 'Category'
  },
  {
    description: 'Implementation notes for frontend architecture and developer tooling.',
    href: '',
    label: 'Engineering',
    meta: 'Category'
  },
  {
    description: 'Design system decisions, component APIs, and editorial UI patterns.',
    href: '',
    label: 'Design systems',
    meta: 'Tag'
  }
];

const workSections = [
  {
    description: 'Research, papers, talks, and conference material.',
    href: '',
    label: 'Publications'
  },
  {
    description: 'Software, experiments, and reusable tools.',
    href: '',
    label: 'Projects'
  }
];

export const Example = {
  render: () => (
    <StoryStage className='flex items-start' minHeight='min-h-80'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink href='' active>Blog</NavigationMenuLink>
          <NavigationMenuDropdown label='Categories' width='xl' defaultOpen>
            <NavigationMenuPanel columns={ 2 }>
              {blogSections.map((item) => (
                <NavigationMenuLink key={ item.label } href={ item.href } variant='panel' description={ item.description } meta={ item.meta }>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuPanel>
          </NavigationMenuDropdown>
          <NavigationMenuDropdown label='Work' width='lg'>
            <NavigationMenuPanel columns={ 2 }>
              {workSections.map((item) => (
                <NavigationMenuLink key={ item.label } href={ item.href } variant='panel' description={ item.description }>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuPanel>
          </NavigationMenuDropdown>
          <NavigationMenuLink href=''>Thoughts</NavigationMenuLink>
          <NavigationMenuLink href=''>About</NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </StoryStage>
  )
};

export const Compact = {
  render: () => (
    <div className='p-8'>
      <NavigationMenu label='Footer navigation'>
        <NavigationMenuList className='gap-4'>
          <NavigationMenuLink href=''>Blog</NavigationMenuLink>
          <NavigationMenuLink href=''>Publications</NavigationMenuLink>
          <NavigationMenuLink href=''>Projects</NavigationMenuLink>
          <NavigationMenuLink href=''>About</NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
};

export const MultipleDropdowns = {
  render: () => (
    <StoryStage className='flex items-start justify-center' minHeight='min-h-80'>
      <NavigationMenu className='justify-center'>
        <NavigationMenuList>
          <NavigationMenuDropdown label='Blog' align='center' width='lg'>
            <NavigationMenuPanel columns={ 1 }>
              {blogSections.slice(0, 3).map((item) => (
                <NavigationMenuLink key={ item.label } href={ item.href } variant='panel' description={ item.description }>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuPanel>
          </NavigationMenuDropdown>
          <NavigationMenuDropdown label='Work' align='center' width='md'>
            <NavigationMenuPanel columns={ 1 }>
              {workSections.map((item) => (
                <NavigationMenuLink key={ item.label } href={ item.href } variant='panel' description={ item.description }>
                  {item.label}
                </NavigationMenuLink>
              ))}
            </NavigationMenuPanel>
          </NavigationMenuDropdown>
        </NavigationMenuList>
      </NavigationMenu>
    </StoryStage>
  )
};
