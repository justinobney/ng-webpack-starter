const randomItems = () => {
  const items = _.times(_.random(2,9), n => ({text: `Value ${n}`, value: n}))
  return {items};
};

const config = {
  primary: [
    [
      {
        text: 'Line No',
        key: 'lineNo',
        component: 'pick-list',
        $inject:['$q', '$http'],
        resolve: ($q, $http) => {
          return $q.resolve({items:[{text:'foo', value:'bar'}]});
        }
      },
      {text: 'Sheet No', key: 'sheetNo', component: 'pick-list', resolve: randomItems},
      {text: 'Rev No', key: 'revNo', component: 'pick-list', resolve: randomItems},
      {text: 'Spec', key: 'spec'},
      {text: 'Size', key: 'size'},
      {text: 'Abbr', key: 'abbr', component: 'pick-list', resolve: randomItems},
      {text: 'Quantity', key: 'quantity'}
    ]
  ],
  secondary: [
    [
      {text: 'Class', key: 'class'},
      {text: 'Schedule', key: 'schedule', component: 'pick-list', resolve: randomItems}
    ],
    [
      {text: 'Size 2', key: 'size2'},
      {text: 'Size 3', key: 'size3', component: 'pick-list', resolve: randomItems}
    ],
    [
      {text: 'End 1', key: 'end1'},
      {text: 'End 2', key: 'end2', component: 'pick-list', resolve: randomItems}
    ],
    [
      {text: 'End Condition', key: 'endCondition'}
    ],
    [
      {text: 'Labor/Material', key: 'laborMaterial'},
      {text: 'X-Ray', key: 'xRay', component: 'pick-list', resolve: randomItems}
    ],
    [
      {text: 'Tag No', key: 'tagNo', component: 'pick-list', resolve: randomItems}
    ],
    [
      {text: 'Notes', key: 'notes'}
    ]
  ],
  header: [
    [
      {text: 'Category', key: 'category'},
      {text: 'Code 1', key: 'code1'},
      {text: 'Code 2', key: 'code2', component: 'pick-list', resolve: randomItems},
      {text: 'Code 3', key: 'code3', component: 'pick-list', resolve: randomItems},
      {text: 'Code 4', key: 'code4', component: 'pick-list', resolve: randomItems},
      {text: 'Code 5', key: 'code5', component: 'pick-list', resolve: randomItems},
      {text: 'Code 6', key: 'code6', component: 'pick-list', resolve: randomItems}
    ],
    [
      {text: 'Drawing', key: 'drawing'},
      {text: 'Paint', key: 'paint'},
      {text: 'Insulation', key: 'insulation'},
      {text: 'Area', key: 'area', component: 'pick-list', resolve: randomItems},
      {text: 'Shop', key: 'shop', component: 'pick-list', resolve: randomItems},
      {text: 'Demo', key: 'demo',component:'pick-list', resolve: randomItems},
      {text: 'Underground', key: 'underground', component: 'pick-list', resolve: randomItems}
    ]
  ]
};

export default config;
