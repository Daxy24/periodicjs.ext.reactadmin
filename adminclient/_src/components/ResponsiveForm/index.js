'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reBulma = require('re-bulma');

var _ResponsiveCard = require('../ResponsiveCard');

var _ResponsiveCard2 = _interopRequireDefault(_ResponsiveCard);

var _AppLayoutMap = require('../AppLayoutMap');

var _util = require('../../util');

var _util2 = _interopRequireDefault(_util);

var _FormElements = require('./FormElements');

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

var _validate2 = require('validate.js');

var _validate3 = _interopRequireDefault(_validate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  notificationForm: _react.PropTypes.any,
  flattenFormData: _react.PropTypes.bool,
  stringyFormData: _react.PropTypes.bool,
  useFormOptions: _react.PropTypes.bool,
  flattenDataOptions: _react.PropTypes.object,
  useDynamicData: _react.PropTypes.bool,
  cardForm: _react.PropTypes.bool,
  cardFormProps: _react.PropTypes.object,
  passProps: _react.PropTypes.object,
  formdata: _react.PropTypes.object,
  __formOptions: _react.PropTypes.object,
  onSubmit: _react.PropTypes.any,
  validations: _react.PropTypes.array,
  hiddenFields: _react.PropTypes.array,
  footergroups: _react.PropTypes.array,
  formgroups: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object])
};

var defaultProps = {
  notificationForm: false,
  flattenFormData: false,
  useFormOptions: false,
  useDynamicData: false,
  cardForm: false,
  onSubmit: 'func:this.props.debug',
  formgroups: []
};

var ResponsiveForm = function (_Component) {
  (0, _inherits3.default)(ResponsiveForm, _Component);

  function ResponsiveForm(props) {
    (0, _classCallCheck3.default)(this, ResponsiveForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveForm.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveForm)).call(this, props));

    var formdata = (0, _assign2.default)({}, props.flattenFormData && props.formdata ? (0, _flat2.default)(props.formdata, props.flattenDataOptions) : props.formdata);
    if (props.stringyFormData) {
      formdata.genericdocjson = (0, _stringify2.default)(props.formdata, null, 2);
    }
    var customPropsFormdata = (0, _assign2.default)({}, props.useDynamicData && props.getState() ? props.getState().dynamic.formdata : {}, props.formdata, formdata);
    customPropsFormdata.__formOptions = props.useFormOptions ? (0, _assign2.default)({}, props.useDynamicData && props.getState() ? props.getState().dynamic.__formOptions : {}, props.__formOptions) : undefined;
    // console.debug({ formdata });
    // console.debug('ResponsiveForm',{ props });
    _this.state = (0, _assign2.default)({
      formDataError: null,
      formDataErrors: {},
      formDataStatusDate: new Date(),
      formDataLists: {},
      formDataTables: {},
      formDataFiles: {}
    },
    // customProps.formdata,
    customPropsFormdata);
    _this.datalists = {};

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.getFormSubmit = _FormElements.getFormSubmit.bind(_this);
    _this.getFormDatalist = _FormElements.getFormDatalist.bind(_this);
    _this.getFormCode = _FormElements.getFormCode.bind(_this);
    _this.getFormTextInputArea = _FormElements.getFormTextInputArea.bind(_this);
    _this.getFormTextArea = _FormElements.getFormTextArea.bind(_this);
    _this.getFormCheckbox = _FormElements.getFormCheckbox.bind(_this);
    _this.getCardFooterItem = _FormElements.getCardFooterItem.bind(_this);
    _this.getFormSelect = _FormElements.getFormSelect.bind(_this);
    _this.getRawInput = _FormElements.getRawInput.bind(_this);
    _this.getSliderInput = _FormElements.getSliderInput.bind(_this);
    _this.getFormDatatable = _FormElements.getFormDatatable.bind(_this);
    _this.getHiddenInput = _FormElements.getHiddenInput.bind(_this);
    // this.getFormEditor = getFormEditor.bind(this);
    _this.getFormLink = _FormElements.getFormLink.bind(_this);
    _this.getFormGroup = _FormElements.getFormGroup.bind(_this);
    _this.getImage = _FormElements.getImage.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ResponsiveForm, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.debug('componentWillReceiveProps', nextProps);
      var formdata = nextProps.flattenFormData ? (0, _flat2.default)(nextProps.formdata, nextProps.flattenDataOptions) : nextProps.formdata;
      formdata = (0, _assign2.default)({}, nextProps.useDynamicData ? this.props.getState().dynamic.formdata : {}, formdata);
      var __formOptions = nextProps.useFormOptions ? (0, _assign2.default)({}, nextProps.useDynamicData && nextProps.getState() ? nextProps.getState().dynamic.__formOptions : {}, nextProps.__formOptions) : undefined;
      formdata.__formOptions = __formOptions;
      this.setState(formdata);
    }
  }, {
    key: 'getFormSumitUrl',
    value: function getFormSumitUrl(baseurl, params, prop) {
      var returnLink = baseurl;
      if (params && params.length > 0) {
        params.forEach(function (param) {
          returnLink = returnLink.replace(param.key, prop[param.val]);
        });
      }
      return returnLink;
    }
  }, {
    key: 'submitForm',
    value: function submitForm() {
      var _this2 = this;

      var state = this.props.getState();
      var headers = state.settings.userprofile ? state.settings.userprofile.options.headers : {};
      var formdata = (0, _assign2.default)({}, this.state);
      var validationErrors = {};
      var hiddenInputs = {};
      var submitFormData = {};
      var formElementFields = [];
      var addNameToName = function addNameToName(formElm) {
        // console.debug('addNameToName','(formElm.passProps && formElm.passProps.state===isDisabled)',(formElm.passProps && formElm.passProps.state==='isDisabled'),{ formElm });
        // skip if null, or disabled
        if (!formElm || formElm.disabled || formElm.passProps && formElm.passProps.state === 'isDisabled') {
          // console.debug('skip', formElm);
          //
        } else if (formElm.type === 'group') {
          if (formElm.groupElements && formElm.groupElements.length) {
            formElm.groupElements.forEach(addNameToName);
          }
        } else if (formElm.name) {
          formElementFields.push(formElm.name);
          if (formElm.type === 'datalist') {
            // console.debug('before',{formElm,formdata});
            if (formElm.datalist.multi && formdata[formElm.name] && formdata[formElm.name].length) {
              formdata[formElm.name] = formdata[formElm.name].map(function (datum) {
                return datum[formElm.datalist.selector || '_id'];
              });
            } else if (formdata[formElm.name] && (0, _keys2.default)(formdata[formElm.name]).length) {
              formdata[formElm.name] = formdata[formElm.name][formElm.datalist.selector || '_id'];
            }
            // console.debug('after',{formElm,formdata});
          }
        }
      };
      delete formdata.formDataLists;
      delete formdata.formDataStatusDate;
      delete formdata.formDataTables;

      if (this.props.hiddenFields) {
        this.props.hiddenFields.forEach(function (hiddenField) {
          hiddenInputs[hiddenField.form_name] = _this2.state[hiddenField.form_val] || hiddenField.form_static_val;
          submitFormData[hiddenField.form_name] = _this2.state[hiddenField.form_val] || hiddenField.form_static_val;
        });
        formdata = (0, _assign2.default)(formdata, hiddenInputs);
      }
      if (this.props.formgroups && this.props.formgroups.length) {
        this.props.formgroups.forEach(function (formgroup) {
          if (formgroup.formElements && formgroup.formElements.length) {
            formgroup.formElements.forEach(function (formElement) {
              var formElementsLeft = formElement.formGroupElementsLeft && formElement.formGroupElementsLeft.length ? formElement.formGroupElementsLeft : false;
              var formElementsRight = formElement.formGroupElementsRight && formElement.formGroupElementsRight.length ? formElement.formGroupElementsRight : false;
              var formGroupLeft = formElement.formGroupCardLeft && formElement.formGroupCardLeft.length ? formElement.formGroupCardLeft : false;
              var formGroupRight = formElement.formGroupCardRight && formElement.formGroupCardRight.length ? formElement.formGroupCardRight : false;
              if (formElementsLeft || formElementsRight) {
                if (formElementsLeft) formElementsLeft.forEach(addNameToName);
                if (formElementsRight) formElementsRight.forEach(addNameToName);
              } else if (formGroupLeft || formGroupRight) {
                if (formGroupLeft) formGroupLeft.forEach(addNameToName);
                if (formGroupRight) formGroupRight.forEach(addNameToName);
              } else if (formElement.type === 'group') {
                if (formElement.groupElements && formElement.groupElements.length) formElement.groupElements.forEach(addNameToName);
              } else if (!formElement || formElement.disabled || formElement.passProps && formElement.passProps.state === 'isDisabled') {
                //skip if dsiabled
                // console.debug('skip', formElement);

              } else {
                // console.debug({ formElement });
                if (formElement.name) formElementFields.push(formElement.name);
              }
            });
          }
        });
      }
      // console.debug({ formElementFields });
      if (this.props.validations) {
        this.props.validations.forEach(function (validation) {
          // console.debug(formdata[ validation.name ], { validation, });
          var validationerror = (0, _validate3.default)((0, _defineProperty3.default)({}, validation.name, formdata[validation.name]), validation.constraints);
          if (validationerror) {
            validationErrors[validation.name] = validationerror[validation.name];
          }
        });
      } else {
        delete formdata.formDataErrors;
      }
      if (formElementFields && formElementFields.length) {
        formElementFields.forEach(function (formElmField) {
          submitFormData[formElmField] = formdata[formElmField];
        });
      }
      // console.debug({ submitFormData, formdata });
      if (validationErrors && (0, _keys2.default)(validationErrors).length < 1) {
        this.setState({ formDataErrors: {} });
      }
      if (validationErrors && (0, _keys2.default)(validationErrors).length > 0) {
        this.setState({ formDataErrors: validationErrors });
        console.debug('has errors', validationErrors, { submitFormData: submitFormData });
      } else if (!this.props.onSubmit) {
        this.props.debug(submitFormData);
      } else if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:this.props') !== -1) {
        delete formdata.formDataFiles;
        delete formdata.formDataErrors;
        if (this.props.onSubmit === 'func:this.props.setDynamicData') {
          // console.debug('this.props', this.props);
          this.props.setDynamicData(this.props.dynamicField, submitFormData);
        } else {
          this.props[this.props.onSubmit.replace('func:this.props.', '')](submitFormData);
        }
      } else if (typeof this.props.onSubmit === 'string' && this.props.onSubmit.indexOf('func:window') !== -1) {
        delete formdata.formDataFiles;
        delete formdata.formDataErrors;
        window[this.props.onSubmit.replace('func:this.props.', '')].call(this, submitFormData);
      } else if (typeof this.props.onSubmit !== 'function') {
        var fetchOptions = this.props.onSubmit;
        var formBody = new FormData();
        var fetchPostBody = void 0;

        //if file
        if ((0, _keys2.default)(formdata.formDataFiles).length) {
          delete headers['Content-Type'];
          delete headers['content-type'];
          (0, _keys2.default)(formdata.formDataFiles).forEach(function (formFileName) {
            var fileList = formdata.formDataFiles[formFileName].files;
            for (var x = 0; x < fileList.length; x++) {
              formBody.append(formFileName, fileList.item(x));
            }
          });
          delete formdata.formDataErrors;
          delete formdata.formDataFiles;
          (0, _keys2.default)(submitFormData).forEach(function (form_name) {
            formBody.append(form_name, submitFormData[form_name]);
          });
          fetchPostBody = formBody;
        } else {
          delete formdata.formDataErrors;
          delete formdata.formDataFiles;
          fetchPostBody = (0, _stringify2.default)(submitFormData);
        }

        fetchOptions.options = (0, _assign2.default)({
          headers: headers
        }, fetchOptions.options, {
          body: fetchPostBody
        });
        fetch(this.getFormSumitUrl(fetchOptions.url, fetchOptions.params, formdata), fetchOptions.options).then(_util2.default.checkStatus).then(function (res) {
          if (fetchOptions.success) {
            if (fetchOptions.success.modal) {
              _this2.props.createModal(fetchOptions.success.modal);
            } else if (fetchOptions.success.notification) {
              _this2.props.createNotification(fetchOptions.success.notification);
            } else {
              _this2.props.createNotification({ text: 'Saved', timeout: 4000, type: 'success' });
            }
          }
          if (fetchOptions.successCallback) {
            var successCallback = typeof fetchOptions.successCallback === 'string' && fetchOptions.successCallback.indexOf('func:this.props.reduxRouter') !== -1 ? _this2.props.reduxRouter[fetchOptions.successCallback.replace('func:this.props.reduxRouter.', '')] : _this2.props[fetchOptions.successCallback.replace('func:this.props.', '')];
            res.json().then(function (successData) {
              if (fetchOptions.successCallback === 'func:this.props.setDynamicData') {
                _this2.props.setDynamicData(_this2.props.dynamicField, submitFormData);
              } else {
                if (fetchOptions.setDynamicData) {
                  _this2.props.setDynamicData(_this2.props.dynamicField, submitFormData);
                }
                successCallback(fetchOptions.successProps || successData, submitFormData);
              }
            });
          } else {
            return res.json();
          }
        }).catch(function (e) {
          if (typeof _this2.props.onError !== 'function') {
            console.error(e);
            _this2.props.errorNotification(e);
          } else {
            _this2.props.onError(e);
          }
        });
      } else {
        this.props.onSubmit(submitFormData);
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (this.props.onChange) {
        var formdata = (0, _assign2.default)({}, nextState);
        var submitFormData = formdata;
        delete formdata.formDataFiles;
        delete formdata.formDataErrors;
        delete formdata.formDataError;
        delete formdata.formDataStatusDate;
        delete formdata.formDataLists;
        delete formdata.formDataTables;
        // console.warn('TODO:this should eventually use the same logic as submitform');
        if (typeof this.props.onChange === 'string' && this.props.onChange.indexOf('func:this.props') !== -1) {
          if (this.props.onChange === 'func:this.props.setDynamicData') {
            this.props.setDynamicData(this.props.dynamicField, submitFormData);
          } else {
            this.props[this.props.onChange.replace('func:this.props.', '')](submitFormData);
          }
        } else if (typeof this.props.onChange === 'string' && this.props.onChange.indexOf('func:window') !== -1) {
          window[this.props.onChange.replace('func:this.props.', '')].call(this, submitFormData);
        } else if (typeof this.props.onChange === 'function') {
          this.props.onChange(nextState);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // console.debug('form render', this.state);
      var keyValue = 0;
      var formGroupData = this.props.formgroups.map(function (formgroup, i) {
        var gridProps = (0, _assign2.default)({
          isMultiline: true,
          key: i
        }, formgroup.gridProps);
        var getFormElements = function getFormElements(formElement, j) {
          // console.debug({ formElement });
          if (!formElement) {
            return null;
          } else if (formElement.type === 'text') {
            return _this3.getFormTextInputArea({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'input') {
            return _this3.getRawInput({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'textarea') {
            return _this3.getFormTextArea({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'hidden') {
            return _this3.getHiddenInput({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'datalist') {
            return _this3.getFormDatalist({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'datatable') {
            return _this3.getFormDatatable({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'checkbox' || formElement.type === 'radio') {
            return _this3.getFormCheckbox({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'label') {
            return _react2.default.createElement(
              _reBulma.Column,
              (0, _extends3.default)({ key: j }, formElement.layoutProps),
              _react2.default.createElement(
                _reBulma.Label,
                (0, _extends3.default)({ key: j }, formElement.labelProps),
                formElement.label
              )
            );
          } else if (formElement.type === 'line') {
            return _react2.default.createElement(
              _reBulma.Column,
              (0, _extends3.default)({ key: j }, formElement.layoutProps),
              _react2.default.createElement('hr', formElement.passProps)
            );
          } else if (formElement.type === 'code') {
            return _this3.getFormCode({ formElement: formElement, i: j, formgroup: formgroup });
            // } else if (formElement.type === 'editor') {
            //   return this.getFormEditor({ formElement,  i:j, formgroup, }); 
          } else if (formElement.type === 'link') {
            return _this3.getFormLink({
              formElement: formElement, i: j, button: _this3.getRenderedComponent(formElement.value, undefined, true)
            });
          } else if (formElement.type === 'select') {
            return _this3.getFormSelect({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'image') {
            return _this3.getImage({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'slider') {
            return _this3.getSliderInput({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'layout') {
            return _react2.default.createElement(
              _reBulma.Column,
              (0, _extends3.default)({ key: j }, formElement.layoutProps),
              _this3.getRenderedComponent(formElement.value)
            );
          } else if (formElement.type === 'submit') {
            return _this3.getFormSubmit({ formElement: formElement, i: j, formgroup: formgroup });
          } else if (formElement.type === 'group') {
            return _this3.getFormGroup({ formElement: formElement, i: j, groupElements: formElement.groupElements.map(getFormElements) });
          } else {
            return _this3.getFormTextInputArea({ formElement: formElement, i: j, formgroup: formgroup });

            // return <Column key={j} {...formElement.layoutProps}>{`${formElement.label || formElement.name }(${formElement.type || 'unknown'}):${ this.state[formElement.name] || formElement.value }`}</Column>;
          }
        };
        /** If the formgroup is a card and has two columns, it will create a single card with two inputs split into two columns based on which ones are set in each column */
        if (formgroup.card && formgroup.card.twoColumns) {
          keyValue++;
          keyValue += i;
          return _react2.default.createElement(
            _ResponsiveCard2.default,
            (0, _extends3.default)({}, formgroup.card.props, { key: keyValue++ }),
            _react2.default.createElement(
              _reBulma.Columns,
              gridProps,
              _react2.default.createElement(
                _reBulma.Column,
                { size: 'isHalf' },
                formgroup.formElements[0].formGroupElementsLeft.map(getFormElements)
              ),
              _react2.default.createElement(
                _reBulma.Column,
                { size: 'isHalf' },
                formgroup.formElements[0].formGroupElementsRight.map(getFormElements)
              )
            )
          );
        }

        /** If a formgroup is a card and doubleCard is true, it will create two columns, each with a card. The cards will be independant of each other but will share the same horizontal space */
        if (formgroup.card && formgroup.card.doubleCard) {
          keyValue++;
          keyValue += i;
          var leftDoubleCardColumnProps = (0, _assign2.default)({
            size: 'isHalf',
            display: 'flex'
          }, formgroup.card.leftDoubleCardColumn);
          var rightDoubleCardColumnProps = (0, _assign2.default)({
            size: 'isHalf',
            display: 'flex'
          }, formgroup.card.rightDoubleCardColumn);
          return _react2.default.createElement(
            _reBulma.Columns,
            gridProps,
            _react2.default.createElement(
              _reBulma.Column,
              leftDoubleCardColumnProps,
              _react2.default.createElement(
                _ResponsiveCard2.default,
                (0, _extends3.default)({}, formgroup.card.leftCardProps, { key: keyValue++ }),
                formgroup.formElements[0].formGroupCardLeft.map(getFormElements)
              )
            ),
            _react2.default.createElement(
              _reBulma.Column,
              rightDoubleCardColumnProps,
              _react2.default.createElement(
                _ResponsiveCard2.default,
                (0, _extends3.default)({}, formgroup.card.rightCardProps, { key: keyValue++ }),
                formgroup.formElements[0].formGroupCardRight.map(getFormElements)
              )
            )
          );
        }

        /** If a formgroup is a card, and is not a doubleCard or twoColumns, it will be a single card in a horizontal space in a half size column  */
        if (formgroup.card && !formgroup.card.twoColumns && !formgroup.card.doubleCard) {
          keyValue++;
          keyValue += i;
          var columnProps = gridProps.subColumnProps || {}; //previously was size=isHalf
          return _react2.default.createElement(
            _reBulma.Columns,
            gridProps,
            _react2.default.createElement(
              _reBulma.Column,
              columnProps,
              _react2.default.createElement(
                _ResponsiveCard2.default,
                (0, _extends3.default)({}, formgroup.card.props, { key: keyValue++ }),
                formgroup.formElements.map(getFormElements)
              )
            )
          );
        }
        return _react2.default.createElement(
          _reBulma.Columns,
          gridProps,
          formgroup.formElements.map(getFormElements)
        );
      });
      var footerGroupData = this.props.footergroups ? this.props.footergroups.map(function (formgroup, i) {
        var gridProps = (0, _assign2.default)({
          isMultiline: true,
          key: i
        }, formgroup.gridProps);
        var getFormElements = function getFormElements(formElement, j) {
          if (formElement.type === 'submit') {
            return _this3.getCardFooterItem({ formElement: formElement, i: j, formgroup: formgroup });
          } else {
            return _react2.default.createElement(
              _reBulma.CardFooterItem,
              null,
              _react2.default.createElement('div', { key: j })
            );
          }
        };
        return _react2.default.createElement(
          _reBulma.CardFooter,
          gridProps,
          formgroup.formElements.map(getFormElements)
        );
      }) : [];

      if (this.props.cardForm) {
        return _react2.default.createElement(
          _reBulma.Card,
          this.props.cardFormProps,
          _react2.default.createElement(
            _reBulma.CardContent,
            null,
            formGroupData
          ),
          footerGroupData
        );
      } else if (this.props.notificationForm) {
        return _react2.default.createElement(
          'div',
          { style: this.props.style },
          _react2.default.createElement(
            _reBulma.Notification,
            this.props.notificationForm,
            formGroupData
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          (0, _extends3.default)({ style: this.props.style }, this.props.passProps),
          formGroupData
        );
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // console.log('componentDidUpdate this.props.error', this.props.error);
      if (this.props.formerror) {
        this.props.onError(this.props.formerror);
      }
    }
  }]);
  return ResponsiveForm;
}(_react.Component);

ResponsiveForm.propType = propTypes;
ResponsiveForm.defaultProps = defaultProps;

exports.default = ResponsiveForm;