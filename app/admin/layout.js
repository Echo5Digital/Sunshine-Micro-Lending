export const metadata = {
  title: {
    default: 'Admin',
    template: '%s | Admin | Sunshine Micro Lending',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-[#F8FAFC]">{children}</div>;
}
