import { useState } from 'react';

export function useNavigationHistory<T>(...routes: T[]) {
  if (routes.length === 0)
    throw new TypeError('Must start off with at least one route.');
  const [_routes, setRoutes] = useState(routes);
  const [position, setPosition] = useState(0);

  const backwards = () => {
    if(position <= 0) {
      return _routes[0];
    }
    const newPosition = position - 1;
    setPosition(newPosition);
    return _routes[newPosition];
  };

  const forwards = (newRoute?: T) => {
    // If given a new route, rewrite forward history.
    if (typeof newRoute !== 'undefined') {
      setRoutes([..._routes.slice(0, position + 1), newRoute]);
      setPosition(position + 1);
      return newRoute;
    }
    // Upper bounds always returns last item.
    // Don't increment position.
    if (position >= (_routes.length - 1)) {
      return _routes[_routes.length - 1];
    }
    // Navigate forward into forward history or predefined routes.
    const newPosition = position + 1;
    setPosition(newPosition);
    return _routes[newPosition];
  };

  return {
    get current() {
      return Object.freeze(_routes[position]);
    },
    get routes() {
      return Object.freeze(_routes);
    },
    get bottom() {
      return Object.freeze(_routes[0]);
    },
    get top() {
      return Object.freeze(_routes[_routes.length - 1]);
    },
    get isBottom() {
      return _routes[position] === _routes[0];
    },
    get isTop() {
      return _routes[position] === _routes[_routes.length - 1];
    },
    position,
    backwards,
    forwards,
  };
}

