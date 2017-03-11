'use strict';

// const DICTIONARY = require('../dictionary');
// const autoFormElements = require('./autoFormElements');
const capitalize = require('capitalize');
const helpers = require('../helpers');
const pluralize = require('pluralize');
pluralize.addIrregularRule('data', 'datas');

function _id () {
  return {
    type: 'text',
    name: '_id',
    label: 'ID',
    labelProps: {
      style: {
        flex:1,
      },
    },
    passProps: {
      state: 'isDisabled',
    },
    layoutProps:{
      horizontalform:true,
    },
  };
}

function _createdat () {
  return {
    type: 'text',
    name: 'createdat',
    label: 'Created',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    passProps: {
      state: 'isDisabled',
    },
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _updatedat() {
  return {
    type: 'text',
    name: 'updatedat',
    label: 'Updated',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    passProps: {
      state: 'isDisabled',
    },
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _name(schema, label, options) {
  let namefield = (schema.username) ? 'username' : 'name';
  return {
    type: 'text',
    name: namefield,
    label: capitalize(namefield),
    labelProps: {
      style: {
        flex: 1,
      },
    },
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _title () {
  return {
    type: 'text',
    name: 'title',
    label: 'Title',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}

function _content (type = 'content') {
  return {
    type: 'textarea',
    name: type,
    label: capitalize(type),
    labelProps: {
      style: {
        flex: 1,
      },
    },
    // layoutProps: {
    //   horizontalform: true,
    // },
  };
}

function _status () {
  return {
    type: 'select',
    name: 'status',
    label: 'Status',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    passProps: {
      style: {
        width: '100%',
      },
    },
    layoutProps: {
      horizontalform: true,
    },
    options :[
      {
        'label': 'Draft',
        'value': 'draft',
      },
      {
        'label': 'Schedule in advance',
        'value': 'schedule',
      },
      {
        'label': 'Publish',
        'value': 'publish',
      },
      {
        'label': 'Review',
        'value': 'review',
      },
      {
        'label': 'Trash',
        'value': 'trash',
      },
    ],
  };
}

function _datetime () {
  return {
    type: 'time',
    name: 'time',
    label: 'Time',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _getLine() {
  return {
    type:'line',
  };
}

function _assetField(fieldname, fieldlabel) {
  // function getFieldName(fieldname) {
  //   if(fieldname)
  //   return fieldname;
  // }
  return function () {
    return {
      type: 'text',
      name: fieldname, //getFieldName(fieldname),
      label: fieldlabel || capitalize(fieldname),
      labelProps: {
        style: {
          flex: 1,
        },
      },
      passProps: {
        state: 'isDisabled',
      },
      // layoutProps: {
      //   horizontalform: true,
      // },
    };
  };
}

function _dateday () {
  return {
    type: 'date',
    name: 'date',
    label: 'Date',
    labelProps: {
      style: {
        flex: 1,
      },
    },
    layoutProps: {
      horizontalform: true,
    },
  };
}

function _assetpreview() {
  return {
    type: 'image',
    link:true,
    'layoutProps': {
      // 'innerFormItem': true,
      // style: {
      //   padding: 0,
      // },
    },
    passProps: {
      // style: {
      //   padding: 0,
      // },
    },
    name: 'transform.fileurl',
    preview: 'transform.previewimage',
  };
}

exports.status = _status;
exports.dateday = _dateday;
exports.datetime = _datetime;
exports.title = _title;
exports.content = _content;

function _publishButtons (schema, label, options = {}) {
  let usablePrefix = helpers.getDataPrefix(options.prefix);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  return {
    label: ' ',
    type: 'group',
    passProps: {
      style: {
        justifyContent: 'center',
      },
    },
    groupElements: [
      {
        type: 'submit',
        value: 'Save Changes',
        passProps: {
          color: 'isPrimary',
          // style: styles.buttons.primary,
        },
        'layoutProps': {
          'innerFormItem': true,
        },
      },
      {
        type: 'layout',
        'layoutProps': {
          'innerFormItem': true,
                      
          style: {
            padding: 0,
          },
        },
        passProps: {
          style: {
            padding: 0,
          },
        },
        value: {
          component: 'ResponsiveButton',
          children: 'Delete',
          props: {
            onClick: 'func:this.props.fetchAction',
            onclickBaseUrl: `${options.extsettings.basename}/${usablePrefix}/${pluralize(label)}/:id?format=json`,
            onclickLinkParams: [
              {
                'key': ':id',
                'val': '_id',
              },
            ],
            onclickThisProp: 'formdata',
            fetchProps: {
              method: 'DELETE',
            },
            successProps: {
              success: {
                notification: {
                  text: 'Deleted',
                  timeout: 4000,
                  type: 'success',
                },
              },
              successCallback: 'func:this.props.reduxRouter.push',
              successProps: `${manifestPrefix}/${pluralize(label)}`,
            },
            buttonProps: {
              color: 'isDanger',
            },
            confirmModal: {},
          },
        },
      },
    ],
  };
}

function getPublishOptions(schema, label, options) {
  let pubOptions = [
    _id(),
    _name(schema, label, options),
  ];
  if (schema.status) {
    pubOptions.push(_status());
  }
  if (schema.publishat) {
    pubOptions = pubOptions.concat([
      _dateday(),
      _datetime(),
    ]);
  }
  if (schema.fileurl) {
    pubOptions = pubOptions.concat([
      _getLine(),
      _assetField('transform.fileurl', 'File URL')(),
      _assetField('transform.size', 'File Size')(),
      _assetField('locationtype', 'Location Type')(),
      _assetField('transform.encrypted', 'Encrypted')(),
      _assetField('attributes.periodicFilename', 'Periodic Filename')()
    ]);
  }
  pubOptions.push(_publishButtons(schema, label, options));

  return pubOptions;
}

function getContentOptions(schema, label, options) {
  let contentItems = [];
  if (schema.fileurl) {
    contentItems.push(_assetpreview(schema, label, options));
  }
  if (schema.title) {
    contentItems.push(_title());
  }
  if (schema.content) {
    contentItems.push(_content());
  }
  if (schema.description) {
    contentItems.push(_content('description'));
  }
  return contentItems;
}

exports.publishBasic = function _publishBasic(schema, label, options = {}) {
  // console.log({ schema });
  let contentItems = getContentOptions(schema, label, options);
  let pubOptions = getPublishOptions(schema, label, options);

  let publishBasic = {
    gridProps: {
      isMultiline: false,
    },
    card: {
      doubleCard: true,
      leftDoubleCardColumn: {
        size: 'isTwoThirds',
        style: {
          display:'flex',
        },
      },
      rightDoubleCardColumn: {
        size: 'isOneThird',
        style: {
          display:'flex',
        },
      },
      leftCardProps: {
        cardTitle: 'Content',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      },
      rightCardProps: {
        cardTitle: 'Publish Options',
        cardStyle: {
          style: {
            marginBottom:0,
          },
        },
      },
    },
    formElements: [
      {
        formGroupCardLeft: contentItems,
        formGroupCardRight: pubOptions,
      },
    ],
  };

  return publishBasic;
};

exports.id = _id;
exports.name = _name;
exports.status = _status;
exports.dateday = _dateday;
exports.datetime = _datetime;
exports.createdat = _createdat;
exports.updatedat = _updatedat;
exports.publishButtons = _publishButtons;
