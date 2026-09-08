import { Header } from './Header';
import { Footer } from './Footer';

export function PageLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="flex-1 pt-[4.5rem] md:pt-[10.375rem]" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
