import NextImage from 'next/image';

const Image = ({ ...rest }) => <NextImage { ...rest } alt='post-image' />;

export default Image;
