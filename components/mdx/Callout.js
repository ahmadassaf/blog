/* eslint-disable no-lone-blocks */

import { BiCheckSquare, BiChip, BiCodeAlt, BiHive, BiInfoCircle, BiShieldQuarter, BiSolidBolt, BiSolidError } from 'react-icons/bi';

const Callout = ({ type, children }) => {
  let calloutBackgroundColor;
  let calloutIcon;
  let calloutTextColour;

  switch (type) {
  case 'warning':
    {
      calloutIcon = <BiSolidBolt className='h-5 w-5'/>;
      calloutBackgroundColor = 'bg-yellow-50';
      calloutTextColour = 'text-yellow-700';
    }
    break;
  case 'info':
    {
      calloutIcon = <BiInfoCircle className='h-5 w-5 fill-blue-600'/>;
      calloutBackgroundColor = 'bg-blue-50';
      calloutTextColour = 'text-gray-700';
    }
    break;
  case 'success':
    {
      calloutIcon = <BiCheckSquare className='h-5 w-5 fill-green-600'/>;
      calloutBackgroundColor = 'bg-green-50';
      calloutTextColour = 'text-green-700';
    }
    break;
  case 'error': {
    calloutIcon = <BiSolidError className='h-5 w-5 fill-red-600'/>;
    calloutBackgroundColor = 'bg-red-50';
    calloutTextColour = 'text-red-700';
  }
    break;
  case 'optimize': {
    calloutIcon = <BiHive className='h-5 w-5 fill-fuchsia-600'/>;
    calloutBackgroundColor = 'bg-fuchsia-50';
    calloutTextColour = 'text-fuchsia-700';
  }
    break;
  case 'settings': {
    calloutIcon = <BiChip className='h-5 w-5 fill-indigo-600'/>;
    calloutBackgroundColor = 'bg-indigo-50';
    calloutTextColour = 'text-indigo-700';
  }
    break;
  case 'code': {
    calloutIcon = <BiCodeAlt className='h-5 w-5 fill-slate-600'/>;
    calloutBackgroundColor = 'bg-slate-50';
    calloutTextColour = 'text-slate-700';
  }
    break;
  case 'secure':
    {
      calloutIcon = <BiShieldQuarter className='h-5 w-5 fill-gray-800'/>;
      calloutBackgroundColor = 'bg-gray-100';
      calloutTextColour = 'text-gray-700';
    }
    break;
  default: return null;
  }

  return (
    <div className={ ` p-4 ${calloutBackgroundColor}` }>
      <div className='flex items-center'>
        <div className='flex-shrink-0'>{calloutIcon}</div>
        <div className='ml-3'>
          <div className={ `mt-2 text-md ${calloutTextColour}` }>
            <span>{children}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Callout;
