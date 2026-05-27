'use client';

import { Children, isValidElement, useEffect, useId, useMemo, useRef, useState } from 'react';

import Icon from '@/components/core/Icon';
import { cn } from '@/components/utilities/cn';

const normalizeOptions = (children, options) => {
  const optionList = options || [];

  if (optionList.length) return optionList;

  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === 'option')
    .map((child) => {
      return {
        'disabled': child.props.disabled,
        'label': child.props.children,
        'value': child.props.value
      };
    });
};

const getInitialValue = ({ defaultValue, multiple, value }) => {
  const incoming = value ?? defaultValue;

  if (multiple) {
    if (Array.isArray(incoming)) return incoming;

    return incoming ? [ incoming ] : [];
  }

  return Array.isArray(incoming) ? incoming[0] ?? '' : incoming ?? '';
};

const Select = ({
  'aria-label': ariaLabel,
  children,
  className,
  classNames = {},
  defaultOpen = false,
  defaultValue,
  disabled = false,
  emptyText = 'No options found.',
  invalid = false,
  multiple = false,
  name,
  onOpenChange,
  onValueChange,
  options = [],
  placeholder = 'Select option',
  searchable = false,
  searchPlaceholder = 'Search options...',
  value
}) => {
  const id = useId();
  const listboxId = `${id}-listbox`;
  const searchId = `${id}-search`;
  const listboxRef = useRef(null);
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const isControlled = value !== undefined;
  const normalizedOptions = useMemo(() => normalizeOptions(children, options), [ children, options ]);
  const [ internalValue, setInternalValue ] = useState(() => getInitialValue({ defaultValue, multiple, value }));
  const [ open, setOpen ] = useState(defaultOpen);
  const [ query, setQuery ] = useState('');
  const [ activeIndex, setActiveIndex ] = useState(0);
  const currentValue = isControlled ? getInitialValue({ multiple, value }) : internalValue;
  let selectedValues = [];

  if (multiple) selectedValues = currentValue;
  if (!multiple && currentValue) selectedValues = [ currentValue ];
  const selectedOptions = normalizedOptions.filter((option) => selectedValues.includes(option.value));
  const filteredOptions = normalizedOptions.filter((option) => {
    if (!query.trim()) return true;

    return String(option.label).toLowerCase().includes(query.toLowerCase());
  });

  const updateOpen = (nextOpen) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (!nextOpen) setQuery('');
  };

  const updateValue = (nextValue, option) => {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue, option);
  };

  const commitOption = (option) => {
    if (!option || option.disabled) return;

    if (multiple) {
      const exists = selectedValues.includes(option.value);
      const nextValue = exists ? selectedValues.filter((item) => item !== option.value) : [ ...selectedValues, option.value ];

      updateValue(nextValue, option);

      return;
    }

    updateValue(option.value, option);
    updateOpen(false);
  };

  const moveActive = (direction) => {
    if (!filteredOptions.length) return;

    setActiveIndex((index) => {
      let nextIndex = Math.max(index - 1, 0);

      if (direction === 'next') nextIndex = Math.min(index + 1, filteredOptions.length - 1);

      return nextIndex;
    });
  };

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) updateOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [ open ]);

  useEffect(() => {
    if (open && searchable) searchRef.current?.focus();
    if (open && !searchable) listboxRef.current?.focus();
  }, [ open, searchable ]);

  useEffect(() => {
    setActiveIndex(0);
  }, [ query ]);

  let triggerLabel = placeholder;

  if (selectedOptions.length && multiple) triggerLabel = selectedOptions.map((option) => option.label).join(', ');
  if (selectedOptions.length && !multiple) triggerLabel = selectedOptions[0].label;

  return (
    <div ref={ rootRef } className={ cn('relative w-full max-w-xs', className, classNames.root) }>
      {name && multiple ? selectedValues.map((item) => <input key={ item } type='hidden' name={ name } value={ item } />) : null}
      {name && !multiple ? <input type='hidden' name={ name } value={ currentValue } /> : null}

      <button
        type='button'
        disabled={ disabled }
        aria-expanded={ open }
        aria-controls={ listboxId }
        aria-haspopup='listbox'
        aria-invalid={ invalid || undefined }
        aria-label={ ariaLabel }
        className={ cn(
          'flex min-h-10 w-full items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2 text-left text-sm font-medium text-gray-950 shadow-xs transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:border-gray-600 dark:disabled:bg-gray-900 dark:disabled:text-gray-600', invalid && 'border-red-500 focus-visible:ring-red-500', classNames.trigger
        ) }
        onClick={ () => updateOpen(!open) }
        onKeyDown={ (event) => {
          if ([ 'ArrowDown', 'Enter', ' ' ].includes(event.key)) {
            event.preventDefault();
            updateOpen(true);
          }
        } }
      >
        <span className={ cn('min-w-0 truncate', !selectedOptions.length && 'text-gray-500 dark:text-gray-400', classNames.value) }>
          {triggerLabel}
        </span>
        {multiple && selectedOptions.length ? (
          <span className='ml-auto rounded-md bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'>
            {selectedOptions.length}
          </span>
        ) : null}
        <Icon name='ChevronDown' decorative size='xs' className={ cn('shrink-0 text-gray-500 transition-transform', open && 'rotate-180') } />
      </button>

      {open ? (
        <div
          className={ cn(
            'absolute left-0 top-full z-50 mt-2 w-full min-w-64 overflow-hidden rounded-xl border border-gray-200 bg-white p-1 shadow-xl shadow-gray-950/10 ring-1 ring-gray-950/5 dark:border-gray-800 dark:bg-gray-950 dark:ring-white/10', classNames.content
          ) }
        >
          {searchable ? (
            <div className='flex items-center gap-2 border-b border-gray-200 px-2 py-2 dark:border-gray-800'>
              <Icon name='Search' decorative size='xs' className='text-gray-400' />
              <input
                ref={ searchRef }
                id={ searchId }
                value={ query }
                placeholder={ searchPlaceholder }
                className='w-full bg-transparent text-sm text-gray-950 outline-none placeholder:text-gray-400 dark:text-gray-100'
                onChange={ (event) => setQuery(event.target.value) }
                onKeyDown={ (event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveActive('next');
                  }

                  if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveActive('previous');
                  }

                  if (event.key === 'Enter') {
                    event.preventDefault();
                    commitOption(filteredOptions[activeIndex]);
                  }

                  if (event.key === 'Escape') updateOpen(false);
                } }
              />
            </div>
          ) : null}

          <div
            ref={ listboxRef }
            id={ listboxId }
            role='listbox'
            aria-multiselectable={ multiple || undefined }
            className='max-h-64 overflow-y-auto py-1'
            tabIndex={ searchable ? -1 : 0 }
            onKeyDown={ (event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                moveActive('next');
              }

              if (event.key === 'ArrowUp') {
                event.preventDefault();
                moveActive('previous');
              }

              if (event.key === 'Home') setActiveIndex(0);
              if (event.key === 'End') setActiveIndex(filteredOptions.length - 1);

              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                commitOption(filteredOptions[activeIndex]);
              }

              if (event.key === 'Escape') updateOpen(false);
            } }
          >
            {filteredOptions.length ? filteredOptions.map((option, index) => {
              const selected = selectedValues.includes(option.value);
              const active = index === activeIndex;

              return (
                <button
                  key={ option.value }
                  type='button'
                  role='option'
                  aria-selected={ selected }
                  disabled={ option.disabled }
                  className={ cn(
                    'flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-gray-800 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-45 dark:text-gray-200 dark:hover:bg-gray-900', active && 'bg-gray-100 dark:bg-gray-900', selected && 'font-medium text-blue-700 dark:text-blue-300', classNames.option
                  ) }
                  onMouseEnter={ () => setActiveIndex(index) }
                  onClick={ () => commitOption(option) }
                >
                  <span className='flex size-4 shrink-0 items-center justify-center'>
                    {selected ? <Icon name='Check' decorative size='xs' /> : null}
                  </span>
                  <span className='truncate'>{option.label}</span>
                </button>
              );
            }) : (
              <div className='px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400'>{emptyText}</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Select;
