import { useCallback, useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import iconTitular from '../assets/icon-titular.svg';
import { DesktopNavbar } from './sections/Navbars/DesktopNavbar';
import { MobileMenuButton } from './sections/Navbars/MobileMenuButton';
import { MobileSidebar } from './sections/Navbars/MobileSidebar';
import { NavbarBrandIcon } from './sections/Navbars/NavbarBrandIcon';
import { NAV_ITEMS } from './sections/Navbars/navItems';

export function Navbar({ activeSection, onNavigate }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDarkMode] = useDarkMode();

  const handleNavigate = useCallback((id) => {
    onNavigate?.(id);
    setIsSidebarOpen(false);
  }, [onNavigate]);

  return (
    <>
      <NavbarBrandIcon src={iconTitular} />

      <DesktopNavbar
        isDarkMode={isDarkMode}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        showTooltip={showTooltip}
        onShowTooltip={() => setShowTooltip(true)}
        onHideTooltip={() => setShowTooltip(false)}
        onNavigate={handleNavigate}
      />

      <MobileMenuButton onOpen={() => setIsSidebarOpen(true)} />

      <MobileSidebar
        isOpen={isSidebarOpen}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
}