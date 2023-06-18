import express from 'express';
import Constants from './config/constants';
import CustomerRoute from './modules/Customer/customer.route';
import ContactRoute from './modules/Customer/Contacts/contacts.route';
import InvoiceRoute from './modules/Customer/Invoices/invoices.route';
import RolesRoute from './modules/Roles/roles.route';
import StaffRoute from './modules/Staff/staff.route';
import ItemRoute from './modules/Items/items.route';
import ItemsGroupRoute from './modules/Items/itemGroups/itemGroups.route';
import NotesRoute from './modules/Customer/Notes/notes.route';
import TasksRoute from './modules/Tasks/tasks.route';

export default class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case 'production':
        this.basePath = '/app/dist';
        break;
      case 'development':
        this.basePath = '/app/public';
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: 'Hello !'
    });
  }

  public path() {
    const router = express.Router();
    router.use('/customers', CustomerRoute);
    router.use('/contacts', ContactRoute);
    router.use('/invoices', InvoiceRoute);
    router.use('/roles', RolesRoute);
    router.use('/staffs', StaffRoute);
    router.use('/items', ItemRoute);
    router.use('/itemsGroup', ItemsGroupRoute);
    router.use('/notes', NotesRoute);
    router.use('/tasks', TasksRoute);
    router.all('/*', (req, res) => {
      return res.status(Constants.NOT_FOUND_CODE).json({
        error: 'URL Not Found'
      });
    });
    return router;
  }
}
