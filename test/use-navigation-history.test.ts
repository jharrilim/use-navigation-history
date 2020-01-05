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
});