/**
 * CmdLauncherSocial
 *
 * @description Command palette page component for displaying social media and contact links.
 * This component renders a list of social media profiles and contact methods including
 * LinkedIn, Twitter, GitHub, and email. Each item includes an icon and handles opening
 * external links in new tabs when selected.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import CmdIcon from '@/components/cmd/CmdIcon';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

/**
 * SocialCmd component renders the social/contact page within the command palette
 *
 * @param {Object} props - Component props
 * @param {Function} props.setPage - Function to navigate between command palette pages
 * @param {string} props.search - Current search query for filtering social links
 * @returns {JSX.Element} Command palette page with social media and contact links
 *
 * @example
 * <SocialCmd
 *   setPage={setPage}
 *   search="github"
 * />
 */
function SocialCmd({ setPage, search }) {

  const socialItems = filterItems(
    [
      {
        'heading': 'Contact Me',
        'id': 'contact',
        'items': [
          {
            'children': 'Linkedin',
            'closeOnSelect': false,
            'heroIcon': <CmdIcon name='UserGroupIcon' />,
            'id': 'linkedin',
            'onClick': () => {
              window.open('https://linkedin.com/in/ahmadassaf', '_blank').focus();
            },
            'title': 'My Linkedin Profile'
          },
          {
            'children': 'Twitter',
            'closeOnSelect': false,
            'heroIcon': <CmdIcon name='ChatBubbleLeftRightIcon' />,
            'id': 'twitter',
            'onClick': () => {
              window.open('https://twitter.com/ahmadaassaf', '_blank').focus();
            },
            'title': 'Follow my Tweets'
          },
          {
            'children': 'Github',
            'closeOnSelect': false,
            'heroIcon': <CmdIcon name='CodeBracketIcon' />,
            'id': 'github',
            'onClick': () => {
              window.open('https://github.com/ahmadassaf', '_blank').focus();
            },
            'title': 'Check my Github repos'
          },
          {
            'children': 'Mail',
            'closeOnSelect': false,
            'heroIcon': <CmdIcon name='EnvelopeIcon' />,
            'id': 'mail',
            'onClick': () => {
              window.open('mailto:ahmad@assaf.website', '_blank').focus();
            },
            'title': 'E-mail me'
          }
        ]
      }
    ], search
  );

  return (
    <CommandPalette.Page id='contact' searchPrefix={ [ 'General', 'Contact' ] } onEscape={ () => {
      setPage('root');
    } }>

      {socialItems.length ? (
        socialItems.map((list) => (
          <CommandPalette.List key={ list.id } heading={ list.heading }>
            {list.items.map(({ id, title, heroIcon, ...rest }) => (
              <CommandPalette.ListItem
                key={ id }
                index={ getItemIndex(socialItems, id) }
                { ...rest }
              >
                <div className='flex items-center w-full gap-3'>
                  {heroIcon}
                  <div className='text-sm font-medium'>{ title }</div>
                </div>
              </CommandPalette.ListItem>
            ))}
          </CommandPalette.List>
        ))
      ) : (
        <CommandPalette.FreeSearchAction />
      )}
    </CommandPalette.Page>
  );
}

export default SocialCmd;
