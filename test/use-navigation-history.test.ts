import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigationHistory } from '../src';

const stringRoute = 'landing';

const multipleRoutes = [
  'profile',
  'settings',
  'privacy'
];

const objectRoutes = [
  { routeName: 'github.com', routeParams: [] },
  { routeName: 'profile', routeParams: [] },
  { routeName: 'repositories', routeParams: ['q'] },
];

describe('# useNavigationHistory', () => {
  describe('## forwards', () => {
    it('moves forward to the next route', () => {
      const firstRoute = '/';
      const secondRoute = 'popular';
      const { result } = renderHook(() => useNavigationHistory(firstRoute, secondRoute));

      expect(result.current.current).toBe(firstRoute);

      act(() => void result.current.forwards());

      expect(result.current.current).toBe(secondRoute);
    });

    it('cannot navigate past the last route', () => {
      const firstRoute = '/';
      const secondRoute = 'popular';
      const { result } = renderHook(() => useNavigationHistory(firstRoute, secondRoute));

      act(() => {
        result.current.forwards();
        result.current.forwards();
      });

      expect(result.current.current).toBe(secondRoute);
    });

  });

  describe('## backwards', () => {
    it('moves backwards to the previous route', () => {
      const firstRoute = '/';
      const secondRoute = 'popular';
      const { result } = renderHook(() => useNavigationHistory(firstRoute, secondRoute));

      act(() => {
        result.current.forwards();
      });

      expect(result.current.current).toBe(secondRoute);

      act(() => {
        result.current.backwards();
      });

      expect(result.current.current).toBe(firstRoute);
    });

    it('cannot navigate before the first route', () => {
      const firstRoute = '/';
      const secondRoute = 'popular';
      const { result } = renderHook(() => useNavigationHistory(firstRoute, secondRoute));

      act(() => {
        result.current.forwards();
      });

      expect(result.current.current).toBe(secondRoute);

      act(() => {
        result.current.backwards();
        result.current.backwards();
      });

      expect(result.current.current).toBe(firstRoute);
    });
  });
});