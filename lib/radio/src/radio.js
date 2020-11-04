"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default2 = {
  name: 'VxeRadio',
  mixins: [_size.default],
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    name: String,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.radio.size || _conf.default.size;
      }
    }
  },
  inject: {
    $xeradiogroup: {
      default: null
    }
  },
  computed: {
    isDisabled: function isDisabled() {
      var $xeradiogroup = this.$xeradiogroup;
      return this.disabled || $xeradiogroup && $xeradiogroup.disabled;
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var $slots = this.$slots,
        $xeradiogroup = this.$xeradiogroup,
        isDisabled = this.isDisabled,
        title = this.title,
        vSize = this.vSize,
        value = this.value,
        label = this.label,
        name = this.name,
        content = this.content;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-radio', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', isDisabled), _ref)],
      attrs: attrs
    }, [h('input', {
      class: 'vxe-radio--input',
      attrs: {
        type: 'radio',
        name: $xeradiogroup ? $xeradiogroup.name : name,
        disabled: isDisabled
      },
      domProps: {
        checked: $xeradiogroup ? $xeradiogroup.value === label : value === label
      },
      on: {
        change: function change(evnt) {
          if (!isDisabled) {
            var params = {
              label: label,
              $event: evnt
            };

            if ($xeradiogroup) {
              $xeradiogroup.handleChecked(params);
            } else {
              _this.$emit('input', label);

              _this.$emit('change', params);
            }
          }
        }
      }
    }), h('span', {
      class: 'vxe-radio--icon'
    }), h('span', {
      class: 'vxe-radio--label'
    }, $slots.default || [_tools.UtilTools.getFuncText(content)])]);
  },
  methods: {
    changeEvent: function changeEvent(evnt) {
      var $xeradiogroup = this.$xeradiogroup,
          isDisabled = this.isDisabled,
          label = this.label;

      if (!isDisabled) {
        var params = {
          label: label,
          $event: evnt
        };

        if ($xeradiogroup) {
          $xeradiogroup.handleChecked(params);
        } else {
          this.$emit('input', label);
          this.$emit('change', params);
        }
      }
    }
  }
};
exports.default = _default2;