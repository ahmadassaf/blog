/*
* Avatar component
*
* @param {string} label - The label to display in the avatar
* @param {string} size - The size of the avatar
* @param {string} color - The color of the avatar
* @param {string} image - The image URL to display in the avatar
* @param {boolean} rounded - Whether the avatar should be rounded or not
* @returns {ReactElement} - The Avatar component
* 
* @example
* <Avatar label="AA" size="large" image="https://www.example.com/image.jpg" rounded />
* -> This will render an avatar with the image from the URL
* <Avatar label="AA" color="yellow" size="large" rounded />
* -> This will render an avatar with the label AA and the color yellow
* <Avatar label="AA" color="yellow" size="large" image="invalid" />
* -> This will render an avatar with the a placeholder icon
* 
* The sizes are:
* - small: h-4 w-4
* - medium: h-8 w-8
* - large: h-10 w-10
* - xlarge: h-14 w-14
* 
* The colors are any supported Tailwind CSS color of the 500 variant
* The avatar will reder a placeholder icon if no valid image url is provided
* If no image parameter is passed then an Avatar with a label (Initials) will be rendered
*
*/
const Avatar = ({ label, size = 'medium', color = 'gray', image, rounded}) => {

    const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    const sizes = {
        small: 'h-4 w-4',
        medium: 'h-8 w-8',
        large: 'h-10 w-10',
        xlarge: 'h-14 w-14',
    }

    if (image) {
        return image.match(new RegExp(pattern)) ? 
            ( <img alt='' src={image} className={ `inline-block ${sizes[size] || 'h-8 w-8'} ${rounded ? 'rounded-full' : 'rounded-md'}` }/> ) : 
        (
        <span className={ `inline-block ${sizes[size]} overflow-hidden ${rounded ? 'rounded-full' : 'rounded-md'} bg-gray-100` }>
            <svg fill="currentColor" viewBox="0 0 24 24" className="h-full w-full text-gray-300">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        </span>
        )        
    }
    return (
        <span className={ `inline-flex ${sizes[size]} items-center justify-center ${rounded ? 'rounded-full' : 'rounded-md'} bg-${color}-500 `}>
            <span className="text-xs font-medium leading-none text-white">{label}</span>
        </span>
    )
}


export default Avatar;

