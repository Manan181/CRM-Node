import ItemGroup from './itemGroups.model';
import { Request, Response } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';

class itemsModule {
  private static logger = Log.getLogger();

  public static createItemGroup = async (req: Request, res: Response) => {
    try {
      const itemsGroup = new ItemGroup({
        name: req.body.name
      });
      const savedItemsGroup = await itemsGroup.save();
      return sucResponse('ItemGroup Saved', res, savedItemsGroup);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static readAllItemGroups = async (res: Response) => {
    try {
      const itemsGroup = await ItemGroup.find();
      if (itemsGroup.length > 0) {
        return sucResponse(`Found ${itemsGroup.length} itemsGroup`, res, itemsGroup);
      } else {
        this.logger.error('No ItemsGroup Found!');
        return errResponse(404, 'No ItemsGroup Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static updateItemGroup = async (req: Request, res: Response) => {
    try {
      const itemGroupId = req.params.id;
      const itemsGroup = await ItemGroup.findById(itemGroupId);
      if (itemsGroup) {
        itemsGroup.set(req.body);
        await itemsGroup.save();
        return sucResponse('Updated ItemGroup!', res, itemsGroup);
      } else {
        this.logger.error('ItemGroup Not Found!');
        return errResponse(404, 'ItemGroup Not Found!', res);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };

  public static deleteItemGroup = async (req: Request, res: Response) => {
    try {
      const itemGroupId = req.params.id;
      const itemGroup = await ItemGroup.findByIdAndDelete(itemGroupId);
      if (!itemGroup) {
        this.logger.error('ItemGroup not found!');
        return errResponse(404, 'ItemGroup Not Found!', res, itemGroup);
      } else {
        return sucResponse('ItemGroup Deleted!', res, itemGroup);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something went wrong!', res, error);
    }
  };
}

export default itemsModule;
