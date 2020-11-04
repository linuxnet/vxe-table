"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffsetSize = getOffsetSize;
exports.calcTreeLine = calcTreeLine;
exports.mergeBodyMethod = mergeBodyMethod;
exports.clearTableDefaultStatus = clearTableDefaultStatus;
exports.clearTableAllStatus = clearTableAllStatus;

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lineOffsetSizes = {
  mini: 3,
  small: 2,
  medium: 1
};

function countTreeExpand(prevRow, params) {
  var $table = params.$table;
  var rowChildren = prevRow[$table.treeOpts.children];
  var count = 1;

  if ($table.isTreeExpandByRow(prevRow)) {
    for (var index = 0; index < rowChildren.length; index++) {
      count += countTreeExpand(rowChildren[index], params);
    }
  }

  return count;
}

function getOffsetSize($xetable) {
  return lineOffsetSizes[$xetable.vSize] || 0;
}

function calcTreeLine(params, items) {
  var $table = params.$table,
      $rowIndex = params.$rowIndex;
  var expandSize = 1;

  if ($rowIndex) {
    expandSize = countTreeExpand(items[$rowIndex - 1], params);
  }

  return $table.rowHeight * expandSize - ($rowIndex ? 1 : 12 - getOffsetSize($table));
}

function mergeBodyMethod(mergeList, _rowIndex, _columnIndex) {
  for (var mIndex = 0; mIndex < mergeList.length; mIndex++) {
    var _mergeList$mIndex = mergeList[mIndex],
        mergeRowIndex = _mergeList$mIndex.row,
        mergeColIndex = _mergeList$mIndex.col,
        mergeRowspan = _mergeList$mIndex.rowspan,
        mergeColspan = _mergeList$mIndex.colspan;

    if (mergeColIndex > -1 && mergeRowIndex > -1 && mergeRowspan && mergeColspan) {
      if (mergeRowIndex === _rowIndex && mergeColIndex === _columnIndex) {
        return {
          rowspan: mergeRowspan,
          colspan: mergeColspan
        };
      }

      if (_rowIndex >= mergeRowIndex && _rowIndex < mergeRowIndex + mergeRowspan && _columnIndex >= mergeColIndex && _columnIndex < mergeColIndex + mergeColspan) {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
}

function clearTableDefaultStatus(_vm) {
  _vm.inited = false;

  _vm.clearSort();

  _vm.clearCurrentRow();

  _vm.clearCurrentColumn();

  _vm.clearRadioRow();

  _vm.clearRadioReserve();

  _vm.clearCheckboxRow();

  _vm.clearCheckboxReserve();

  _vm.clearRowExpand();

  _vm.clearTreeExpand();

  _vm.clearTreeExpandReserve();

  if (_vXETable.default._edit) {
    _vm.clearActived();
  }

  if (_vm.keyboardConfig || _vm.mouseConfig) {
    _vm.clearSelected();
  }

  if (_vm.mouseConfig) {
    _vm.clearCellAreas();

    _vm.clearCopyCellArea();
  }

  return _vm.clearScroll();
}

function clearTableAllStatus(_vm) {
  if (_vXETable.default._filter) {
    return _vm.clearFilter();
  }

  return clearTableDefaultStatus(_vm);
}