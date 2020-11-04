"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeCheckbox',
  mixins: [_size.default],
  props: {
    value: Boolean,
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.checkbox.size || _conf.default.size;
      }
    }
  },
  inject: {
    $xecheckboxgroup: {
      default: null
    }
  },
  computed: {
    isGroup: function isGroup() {
      return this.$xecheckboxgroup;
    },
    isDisabled: function isDisabled() {
      return this.disabled || this.isGroup && this.$xecheckboxgroup.disabled;
    }
  },
  render: function render(h) {
    var _ref;

    var $slots = this.$slots,
        $xecheckboxgroup = this.$xecheckboxgroup,
        isGroup = this.isGroup,
        isDisabled = this.isDisabled,
        title = this.title,
        vSize = this.vSize,
        indeterminate = this.indeterminate,
        value = this.value,
        label = this.label,
        content = this.content;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-checkbox--input',
      attrs: {
        type: 'checkbox',
        disabled: isDisabled
      },
      domProps: {
        checked: isGroup ? _ctor.default.includes($xecheckboxgroup.value, label) : value
      },
      on: {
        change: this.changeEvent
      }
    }), h('span', {
      class: 'vxe-checkbox--icon'
    }), h('span', {
      class: 'vxe-checkbox--label'
    }, $slots.default || [_tools.UtilTools.getFuncText(content)])]);
  },
  methods: {
    changeEvent: function changeEvent(evnt) {
      var $xecheckboxgroup = this.$xecheckboxgroup,
          isGroup = this.isGroup,
          isDisabled = this.isDisabled,
          label = this.label;

      if (!isDisabled) {
        var checked = evnt.target.checked;
        var params = {
          checked: checked,
          label: label,
          $event: evnt
        };

        if (isGroup) {
          $xecheckboxgroup.handleChecked(params);
        } else {
          this.$emit('input', checked);
          this.$emit('change', params);
        }
      }
    }
  }
};
exports.default = _default2;