import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigationHistory } from '../src';

const stringRoute = 'landing';

const multipleRoutes = [
  'profile',
  'settings',
  'privacy'
] as const;

const objectRoutes = [
  { routeName: 'github.com', routeParams: [] },
  { routeName: 'profile', routeParams: [] },
  { routeName: 'repositories', routeParams: ['q'] },
] as const;

describe('# Acceptance Tests', () => {
  it.each([
    stringRoute,
    multipleRoutes,
    objectRoutes,
  ])('renders with:\n\troutes:\t %j\n\ttime:\t', (...args) => {
    const { result } = renderHook(() => useNavigationHistory(...args));
    expect(result.current.routes).toEqual(args);
  });

  it.each([
    [multipleRoutes, 'friends'],
    [[stringRoute], 'world']
  ])('can navigate forward with:\n\troutes:\t %j\n\tto:\t %j\n\ttime:\t', (routes, next) => {
    const { result } = renderHook(() => useNavigationHistory(...routes));

    act(() => void result.current.forwards(next));

    expect(result.current.current).toBe(next);
  });

});

