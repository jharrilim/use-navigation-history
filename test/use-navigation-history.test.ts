import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigationHistory } from '../src';

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

    it('overwrites next cached routes when given a new route', () => {
      const firstRoute = '/';
      const secondRoute = 'popular';
      const newRoute = 'new';
      const { result } = renderHook(() => useNavigationHistory(firstRoute, secondRoute));

      act(() => {
        result.current.forwards(newRoute);
      });

      expect(result.current.current).toBe(newRoute);
      expect(result.current.routes).toEqual([firstRoute, newRoute]);
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

  describe('## current', () => {
    it('retrieves the current route (first route) given multiple routes', () => {
      const { result } = renderHook(() => useNavigationHistory('Hello', 'World'));

      expect(result.current.current).toBe('Hello');
    });
  })
});