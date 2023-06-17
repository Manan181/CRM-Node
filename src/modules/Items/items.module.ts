import Item from './items.model';
import { Request } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

class itemsModule {
  private static logger = Log.getLogger();

  public static createItem = async (req: Request) => {
    try {
      const item = new Item({
        description: req.body.description,
        longDescription: req.body.longDescription,
        rate: req.body.rate,
        tax1: req.body.tax1,
        tax2: req.body.tax2,
        unit: req.body.unit,
        itemGroup: req.body.itemGroup
      });
      const savedItem = await item.save();
      return sucResponse(200, 'Item Saved', savedItem);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readAllItems = async () => {
    try {
      const items = await Item.find();
      if (items.length > 0) {
        return sucResponse(200, `Found ${items.length} items`, items);
      } else {
        this.logger.error('No Items Found!');
        return errResponse(404, 'No Items Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static updateItem = async (req: Request) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findById(itemId);
      if (item) {
        item.set(req.body);
        await item.save();
        return sucResponse(201, 'Updated Item!', item);
      } else {
        this.logger.error('Item Not Found!');
        return errResponse(404, 'Item Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static deleteItem = async (req: Request) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByIdAndDelete(itemId);
      if (!item) {
        this.logger.error('Item not found!');
        return errResponse(404, 'Item Not Found!', item);
      } else {
        return sucResponse(200, 'Item Deleted!', item);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default itemsModule;
