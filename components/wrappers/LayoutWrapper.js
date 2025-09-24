/**
 * LayoutWrapper Component
 *
 * @description Main layout wrapper component that provides the overall page structure
 * for the entire application. Combines navigation, main content area, footer, and
 * decorative background shapes into a cohesive layout with proper spacing and isolation.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import SectionContainer from '@/components/containers/SectionContainer';
import ShapeContainer from '@/components/containers/ShapeContainer';
import Footer from '@/components/elements/Footer';
import Menu from '@/components/navigation/Menu';

/**
 * Renders the main application layout structure
 *
 * @description Core layout component that establishes the page structure with header navigation,
 * main content area, and footer. Features decorative background shapes, proper overflow handling,
 * and full-height layout with flexbox for sticky footer behavior.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to render in the main area
 *
 * @returns {JSX.Element} Complete page layout with navigation, content, and footer
 *
 * @example
 * // Basic usage wrapping page content
 * <LayoutWrapper>
 *   <HomePage />
 * </LayoutWrapper>
 *
 * @example
 * // Used in Next.js pages or app layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <LayoutWrapper>
 *       {children}
 *     </LayoutWrapper>
 *   );
 * }
 */
const LayoutWrapper = ({ children }) => (
  <div className='relative isolate overflow-x-hidden'>
    <ShapeContainer />
    <SectionContainer>
      <div className='flex h-screen flex-col justify-between'>
        <Menu />
        <main className='mb-8'>{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  </div>

);

export default LayoutWrapper;
