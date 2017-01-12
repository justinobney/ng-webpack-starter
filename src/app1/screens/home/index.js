import {groupBy, map, sortBy, minBy, maxBy, times} from 'lodash';
import template from './index.html';
import data from './data.js';
import './index.scss';

function controller(){
  const ctrl = this;

  ctrl.calculate = calculate;

  ctrl.dataLength = data.length;
  ctrl.data = sortBy(
    map(
      groupBy(data, 'area'),
      (value, key) => ({key, value, count:value.length })
    ),
    x => x.count * -1
  );

  function calculate(){
    const users = times(ctrl.userCount, x=> `user: ${x+1}`);
    const base = data.length / users.length;
    const result = users.reduce(
      (acc, user, idx) => {
        const halfWay = users.length / 2;
        const val = idx + 1 >= halfWay ? Math.ceil(base) : Math.floor(base);
        const idealSize = users.length - 1 === idx ? acc.remaining : val;
        acc.remaining -= idealSize;

        acc.users.push({
          user,
          idealSize: idealSize,
          itemCount: 0,
          items: [],
        });
        return acc;
      },
      {users:[], remaining: data.length}
    );

    const copy = [...ctrl.data];

    for (var i = 0; i < result.users.length; i++) {
      const {key, count} = copy.shift();
      const user = result.users[i];
      user.items = user.items.concat([{key, count}]);
      user.itemCount += count;
    }

    while (copy.length) {
      const slacker = minBy(result.users, 'itemCount');
      const {key, count} = copy.shift();
      slacker.items = slacker.items.concat([{key, count}]);
      slacker.itemCount += count;
    }

    const largest = maxBy(result.users, 'itemCount').itemCount;
    const normalized = sortBy(
      result.users.map(x => {
        x.percent = ((x.itemCount / largest) * 100).toFixed(2);
        x.percentStyle = `${x.percent}%`;
        return x;
      }),
      x => -1 * x.itemCount
    );

    result.users = normalized;
    ctrl.result = result;
  }

  function findSlacker(result){
    const slacker = minBy(result, 'itemCount');
  }
}

export default angular
  .module('ng-starter.home', [])
  .component('home', { template, controller })
  .name;
