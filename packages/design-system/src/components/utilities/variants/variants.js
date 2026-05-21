import { cn } from '../cn/cn.js';

export const createVariants = ({ base = '', compoundVariants = [], defaultVariants = {}, variants = {} }) => {
  const resolver = (options = {}) => {
    const definedOptions = Object.fromEntries(
      Object.entries(options).filter(([ , value ]) => value !== undefined)
    );
    const selected = { ...defaultVariants, ...definedOptions };
    const variantClasses = Object.entries(variants).map(([ name, values ]) => values[selected[name]]);
    const compoundClasses = compoundVariants
      .filter(({ className, ...conditions }) => Object.entries(conditions).every(([ name, value ]) => selected[name] === value))
      .map(({ className }) => className);

    return cn(base, variantClasses, compoundClasses, options.className);
  };

  resolver.variants = variants;
  resolver.defaultVariants = defaultVariants;

  return resolver;
};
