import Home from '../views/pages/home';
// import Favorite from '../views/pages/favorite';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
