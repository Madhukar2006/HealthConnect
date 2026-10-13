import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  searchParams: URLSearchParams;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentUrl(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window !== 'undefined') {
      if (to !== window.location.pathname + window.location.search) {
        window.history.pushState({}, '', to);
        setCurrentUrl(to);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const [pathOnly, searchOnly] = currentUrl.split('?');
  const searchParams = new URLSearchParams(searchOnly || '');

  return (
    <RouterContext.Provider value={{ path: pathOnly || '/', navigate, searchParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within RouterProvider');
  return context;
};

export const Link: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  title?: string;
}> = ({ to, className, children, onClick, title }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} title={title}>
      {children}
    </a>
  );
};
