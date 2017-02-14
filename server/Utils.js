'use strict';
import Mongoose from 'mongoose';
import Mission from '../models/mission';


class Utils {
  static saveMission(item) {
    if (!item.name) return {message: 'Name is empty!'};
    let mission = new Mission({
      _id: Mongoose.Types.ObjectId(),
      parentId: item.parentId,
      name: item.name,
      type: item.type,
      description: item.description,
      status: 'A'
    });
    let promise = mission.save();
    return promise;
  }

  static updateMission(item) {
    if (!item._id) return {message: 'No item found!'};
    let updateFields = {};
    if (item.name) updateFields.name = item.name;
    if (item.description) updateFields.description = item.description;
    if (item.type) updateFields.type = item.type;
    if (item.status) updateFields.status = item.status;
    if (item.isDone) updateFields.isDone = item.isDone;
    if (item.parentId) updateFields.parentId = item.parentId;
    if (item.dueTime) updateFields.dueTime = item.dueTime;

    async function f() {
      let mission = await Mission.findById({_id:item._id}).exec();
      await Object.assign(mission,updateFields);
      await console.log('mission',mission);
      let promise = await mission.save();
      return promise;
    }

    return f();
  }

  static removeMission(item) {
    if (!item._id) return {message: 'No item found!'};
    let removeCondition = {};
    if (item._id) removeCondition._id = item._id;
    if (item.name) removeCondition.name = item.name;
    if (item.description) removeCondition.description = item.description;
    if (item.type) removeCondition.type = item.type;
    if (item.status) removeCondition.status = item.status;
    if (item.isDone) removeCondition.isDone = item.isDone;
    if (item.parentId) removeCondition.parentId = item.parentId;
    if (item.dueTime) removeCondition.dueTime = item.dueTime;

    let promise = Mission.remove(removeCondition);
    return promise;
  }

  static async findMissionList(item) {
    //if (!item) return {message: 'No item found!'};
    let condition = {};
    if (item._id) condition._id = item._id;
    if (item.name) condition.name = item.name;
    if (item.description) condition.description = item.description;
    if (item.type) condition.type = item.type;
    if (item.status) condition.status = item.status;
    if (item.isDone) condition.isDone = item.isDone;
    if (item.parentId) condition.parentId = item.parentId;
    if (item.dueTime) condition.dueTime = item.dueTime;

    let query = Mission.find(condition);
    let promise = query.exec();
    return promise;
  }

}

export default Utils;