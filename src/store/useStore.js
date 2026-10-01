import { useContext } from 'react';
import { StoreContext } from './store-context';

/** Access bag, quick-view, demo-video and toast state from any component. */
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
