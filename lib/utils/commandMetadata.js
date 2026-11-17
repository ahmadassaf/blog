const badgeLabel = (value) => (typeof value === 'string' ? value.trim() : '');

/** Keep search data intact while displaying only the category badge. */
export function enrichCommandMetadata(item) {
  const category = badgeLabel(item.category);
  const badges = category ? [{ 'label': category, 'tone': 'blue' }] : [];

  return { ...item, badges, 'subtitle': item.subtitle ?? item.summary };
}

/** Publications use their supplied venue, year and publication distinctions. */
export function enrichPublicationCommandMetadata(item) {
  const badges = [];
  const venueType = badgeLabel(item.venueType);
  const award = badgeLabel(item.award);

  if (venueType) badges.push({ 'label': venueType, 'tone': 'gray' });
  if (award) badges.push({ 'label': award, 'tone': 'blue' });

  return { ...item, badges, 'subtitle': item.venue ?? item.subtitle, 'trailingMetadata': item.year };
}
