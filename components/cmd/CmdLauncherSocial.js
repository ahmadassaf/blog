
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { RiMailOpenFill, RiTwitterXFill } from 'react-icons/ri';
import CommandPalette, { filterItems, getItemIndex } from '@tmikeladze/react-cmdk';

import '@tmikeladze/react-cmdk/dist/cmdk.css';

function PostsCmd({ setPage, search }) {

  const socialItems = filterItems(
    [
      {
        'heading': 'Contact Me',
        'id': 'contact',
        'items': [
          {
            'children': 'Linkedin',
            'closeOnSelect': false,
            'heroIcon': <FaLinkedin className='h-5 w-5  fill-icon'/>,
            'id': 'linkedin',
            'onClick': () => {
              window.open('https://linkedin.com/in/ahmadassaf', '_blank').focus();
            },
            'title': 'My Linkedin Profile'
          },
          {
            'children': 'Twitter',
            'closeOnSelect': false,
            'heroIcon': <RiTwitterXFill className='h-5 w-5  fill-icon'/>,
            'id': 'twitter',
            'onClick': () => {
              window.open('https://twitter.com/ahmadaassaf', '_blank').focus();
            },
            'title': 'Follow my Tweets'
          },
          {
            'children': 'Github',
            'closeOnSelect': false,
            'heroIcon': <FaGithub className='h-5 w-5  fill-icon'/>,
            'id': 'github',
            'onClick': () => {
              window.open('https://github.com/ahmadassaf', '_blank').focus();
            },
            'title': 'Check my Github repos'
          },
          {
            'children': 'Mail',
            'closeOnSelect': false,
            'heroIcon': <RiMailOpenFill className='h-5 w-5  fill-icon'/>,
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
                <div className='flex items-center w-full'>
                  {heroIcon}
                  <div className='mx-2 text-md'>{ title }</div>
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

export default PostsCmd;
