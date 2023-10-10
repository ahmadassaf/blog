import SectionContainer from '@/components/containers/SectionContainer';
import ShapeContainer from '@/components/containers/ShapeContainer';
import Footer from '@/components/elements/Footer';
import Menu from '@/components/navigation/Menu';

const LayoutWrapper = ({ children }) => (
  <div className='relative isolate overflow-x-hidden'>
    <ShapeContainer></ShapeContainer>
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
