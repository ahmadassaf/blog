import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';

import { Field, FieldDescription, FieldError, FieldInput, FieldLabel } from './Field';

const componentDocs = getComponentDocs('Core/Field');

export default {
  component: Field,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Field'
};

export const Example = {
  render: () => (
    <div className='max-w-sm p-6'>
      <Field>
        <FieldLabel htmlFor='email'>Email</FieldLabel>
        <FieldInput id='email' type='email' placeholder='you@example.com' />
        <FieldDescription>Used for article updates only.</FieldDescription>
      </Field>
    </div>
  )
};

export const Error = {
  render: () => (
    <div className='max-w-sm p-6'>
      <Field>
        <FieldLabel htmlFor='slug'>Article slug</FieldLabel>
        <FieldInput id='slug' aria-invalid='true' defaultValue='Design Systems' />
        <FieldError>Use lowercase letters and hyphens only.</FieldError>
      </Field>
    </div>
  )
};

export const Disabled = {
  render: () => (
    <div className='max-w-sm p-6'>
      <Field>
        <FieldLabel htmlFor='readonly-email'>Email</FieldLabel>
        <FieldInput id='readonly-email' type='email' value='editor@example.com' disabled readOnly />
        <FieldDescription>This value is managed by account settings.</FieldDescription>
      </Field>
    </div>
  )
};
