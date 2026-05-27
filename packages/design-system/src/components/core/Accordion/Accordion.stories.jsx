import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import { Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionItem,
  AccordionTrigger } from './Accordion';

const componentDocs = getComponentDocs('Core/Accordion');

export default {
  component: AccordionGroup,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Accordion'
};

export const Example = {
  render: () => (
    <div className='max-w-xl p-6'>
      <AccordionGroup items={ [
        { content: 'Use it for content that benefits from progressive disclosure.', title: 'When should I use accordion?', value: 'usage' },
        { content: 'The trigger is a native button and exposes expanded state.', title: 'Is it accessible?', value: 'a11y' }
      ] } />
    </div>
  )
};

export const MultipleOpen = {
  render: () => (
    <div className='max-w-xl p-6'>
      <AccordionGroup
        type='multiple'
        defaultValue={ [ 'usage', 'a11y' ] }
        items={ [
          { content: 'Use it when readers may need more than one answer open while comparing information.', title: 'Can multiple sections stay open?', value: 'usage' },
          { content: 'Triggers are buttons and expose aria-expanded to assistive technology.', title: 'What is the keyboard contract?', value: 'a11y' },
          { content: 'Keep titles short and put long explanations inside the panel content.', title: 'How should content be written?', value: 'content' }
        ] }
      />
    </div>
  )
};

export const Composed = {
  render: () => (
    <div className='max-w-xl p-6'>
      <Accordion defaultValue='tokens'>
        {({ currentValue, setValue }) => (
          <>
            {[
              { content: 'Color, type, spacing, radius, and motion values.', title: 'Tokens', value: 'tokens' },
              { content: 'Core components use tokens and expose documented customization props.', title: 'Components', value: 'components' }
            ].map((item) => {
              const isOpen = currentValue === item.value;

              return (
                <AccordionItem key={ item.value } value={ item.value }>
                  <AccordionTrigger isOpen={ isOpen } onClick={ () => setValue(isOpen ? undefined : item.value) }>
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent isOpen={ isOpen }>{item.content}</AccordionContent>
                </AccordionItem>
              );
            })}
          </>
        )}
      </Accordion>
    </div>
  )
};
