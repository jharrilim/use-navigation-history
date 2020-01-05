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

describe('# Acceptance Tests', () => {
  it.each([
    stringRoute,
    multipleRoutes,
    objectRoutes,
  ])('renders with:\n\troutes:\t %j\n\ttime:\t', (...args) => {
    const { result } = renderHook(() => useNavigationHistory(...args));
    expect([result.current.current]).toEqual(args);
  });

  it.each([
    [multipleRoutes, 'friends'],
    [[stringRoute], 'world']
  ])('can navigate forward with:\n\troutes:\t %j\n\tto:\t %j\n\ttime:\t', (routes, next) => {
    const { result } = renderHook(() => useNavigationHistory(...routes));

    act(() => void result.current.forwards(next));

    expect(result.current.current).toBe(next);
  });

  it.each([
    [[stringRoute], 2],
    [multipleRoutes, 4],
    [objectRoutes, 10],
  ])
    ('won\'t navigate further than the last route in history given:\n\troutes:\t %j\n\tamount:\t %j\n\ttime:\t',
      ([...routes], amount) => {
        const { result } = renderHook(() => useNavigationHistory(...routes));
        Object.keys(amount).forEach(() => {
          act(() => void result.current.forwards());
        });

        // expect(result.current.current).toEqual(routes[routes.length - 1]);
      });
});

