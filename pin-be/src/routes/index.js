import pinterestRoutes from './pinterestRoutes';

function route(app) {
  app.use('/pinterest', pinterestRoutes);
}

export default route;
