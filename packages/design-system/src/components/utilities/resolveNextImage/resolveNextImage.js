const resolveNextImage = (candidate) => {
  let component = candidate;
  let depth = 0;

  while (component && typeof component === 'object' && 'default' in component && depth < 3) {
    component = component.default;
    depth += 1;
  }

  if (typeof component === 'function') return component;

  return null;
};

export default resolveNextImage;
