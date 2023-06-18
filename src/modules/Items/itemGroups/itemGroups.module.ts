import ItemGroup from './itemGroups.model';
import { Request } from 'express';
import Log from '../../../helpers/logger';
import { sucResponse, errResponse } from '../../../helpers/utils';

class itemsModule {
  private static logger = Log.getLogger();

  public static createItemGroup = async (req: Request) => {
    try {
      const itemsGroup = new ItemGroup({
        name: req.body.name
      });
      const savedItemsGroup = await itemsGroup.save();
      return sucResponse(200, 'ItemGroup Saved', savedItemsGroup);
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static readAllItemGroups = async () => {
    try {
      const itemsGroup = await ItemGroup.find();
      if (itemsGroup.length > 0) {
        return sucResponse(200, `Found ${itemsGroup.length} itemsGroup`, itemsGroup);
      } else {
        this.logger.error('No ItemsGroup Found!');
        return errResponse(404, 'No ItemsGroup Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static updateItemGroup = async (req: Request) => {
    try {
      const itemGroupId = req.params.id;
      const itemsGroup = await ItemGroup.findById(itemGroupId);
      if (itemsGroup) {
        itemsGroup.set(req.body);
        await itemsGroup.save();
        return sucResponse(201, 'Updated ItemGroup!', itemsGroup);
      } else {
        this.logger.error('ItemGroup Not Found!');
        return errResponse(404, 'ItemGroup Not Found!');
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };

  public static deleteItemGroup = async (req: Request) => {
    try {
      const itemGroupId = req.params.id;
      const itemGroup = await ItemGroup.findByIdAndDelete(itemGroupId);
      if (!itemGroup) {
        this.logger.error('ItemGroup not found!');
        return errResponse(404, 'ItemGroup Not Found!', itemGroup);
      } else {
        return sucResponse(200, 'ItemGroup Deleted!', itemGroup);
      }
    } catch (error) {
      this.logger.error(error.message);
      return errResponse(500, 'Something Went Wrong!!', error);
    }
  };
}

export default itemsModule;
