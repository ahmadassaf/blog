import { Avatar, Banner, Button, Card, Grid, GridItem, Icon, Kbd, Link, Pill, TextHighlight, Typography } from '../../src/index';

export default {
  tags: [ 'autodocs' ],
  title: 'Overview/All Components'
};

export const Catalog = {
  'render': () => (
    <div className='max-w-5xl space-y-10 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100'>
      <section className='space-y-3'>
        <Typography variant='heading-xl'>Design System Catalog</Typography>
        <Typography variant='paragraph-md'>
          Public components exported by @ahmadassaf/design-system.
        </Typography>
      </section>

      <section className='space-y-4'>
        <Typography variant='heading-sm'>Actions</Typography>
        <div className='flex flex-wrap gap-3'>
          <Button variant='solid' tone='blue' size='md'>Primary</Button>
          <Button variant='outline' tone='gray' size='md'>Secondary</Button>
          <Button variant='ghost' tone='gray' size='md'>Ghost</Button>
          <Button variant='outline' tone='blue' size='md' href='/blog'>Link button</Button>
        </div>
      </section>

      <section className='space-y-4'>
        <Typography variant='heading-sm'>Content</Typography>
        <div className='grid gap-4 md:grid-cols-2'>
          <Card title='Card title' subtitle='Card subtitle and supporting copy.'>
            <div className='mt-4 flex items-center gap-3'>
              <Pill tone='blue'>React</Pill>
              <Kbd keys='command,k' />
            </div>
          </Card>
          <div className='space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700'>
            <Avatar label='AA' tone='blue' shape='circle' size='lg' />
            <p>
              A sentence with <TextHighlight>highlighted text</TextHighlight> and an inline <Link href='/blog' className='text-blue-600'>link</Link>.
            </p>
            <div className='flex gap-3'>
              <Icon kind='github' href='https://github.com/ahmadassaf' />
              <Icon kind='mail' href='mailto:hello@example.com' />
            </div>
          </div>
        </div>
      </section>

      <section className='space-y-4'>
        <Typography variant='heading-sm'>Layout</Typography>
        <Grid>
          <GridItem title='One' description='First grid item' />
          <GridItem title='Two' description='Second grid item' />
          <GridItem title='Three' description='Third grid item' />
        </Grid>
      </section>

      <Banner title='Announcement'>This is the banner primitive.</Banner>
    </div>
  )
};
