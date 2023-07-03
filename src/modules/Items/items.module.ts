import Item from './items.model';
import { Request, Response } from 'express';
import Log from '../../helpers/logger';
import { sucResponse, errResponse } from '../../helpers/utils';

class itemsModule {
  private static logger = Log.getLogger();

  public static createItem = async (req: Request, res: Response) => {
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
      return sucResponse('Item Saved', res, savedItem);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllItems = async (res: Response) => {
    try {
      const items = await Item.find();
      if (items.length > 0) {
        return sucResponse(`Found ${items.length} items`, res, items);
      } else {
        this.logger.error('No Items Found!');
        return errResponse(404, 'No Items Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findById(itemId);
      if (item) {
        item.set(req.body);
        await item.save();
        return sucResponse('Updated Item!', res, item);
      } else {
        this.logger.error('Item Not Found!');
        return errResponse(404, 'Item Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findByIdAndDelete(itemId);
      if (!item) {
        this.logger.error('Item not found!');
        return errResponse(404, 'Item Not Found!', res, item);
      } else {
        return sucResponse('Item Deleted!', res, item);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default itemsModule;
