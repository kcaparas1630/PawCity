import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{
        ['--sidebar-width' as string]: '20rem'
      }}
    >
      <AppSidebar />
      <main style={{
        flex: '1',
        width: '100%',
        height: '100vh',
        overflow: 'auto'
      }}>
        {children}
      </main>
    </SidebarProvider>
  );
}
