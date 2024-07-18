import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid'

export default function Tooltip({ text, children }) {
    return (
    <span class="group relative !inline-flex hover:text-blue-700 cursor-context-menu">
        {children}
        <EllipsisHorizontalCircleIcon class="h-3 w-3 text-gray-700 group-hover:text-blue-700"/>
        <span class="absolute top-8 scale-0 w-[400px] transition-all rounded bg-gray-800 group-hover:bg-blue-700 p-2 text-xs text-white group-hover:scale-100">{text}</span>
    </span>
    )
}