'use strict';
import Mongoose from 'mongoose';
import Mission from '../models/mission';


class Utils {
  static saveMission(item) {
    if (!item.name) return {message: 'Name is empty!'};
    let _id = Mongoose.Types.ObjectId();
    try {
      let mission = new Mission({
        _id: _id,
        parentId: item.parentId,
        name: item.name,
        type: item.type,
        description: item.description,
        status: 'ACTIVE'
      });
      mission.save(function (err) {
        if (err) return next(err);
        return {message: 'has been updated successfully!'};
      });

    } catch (e) {
      return {message: item.name + ' is not saved.'};
    }
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

    try {
      Mission.update({'_id': item._id}, {$set: updateFields}, function (err) {
        if (err) return next(err);
        return {message: item.name + 'has been updated successfully!'};
      });

    } catch (e) {
      return {message: item.name + ' is not saved.'};
    }
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

    try {
      Mission.remove(removeCondition, function (err) {
        if (err) return next(err);
        return {message: item.name + 'has been removed successfully!'};
      });

    } catch (e) {
      return {message: item.name + ' is not removed.'};
    }
  }
}

export default Utils;