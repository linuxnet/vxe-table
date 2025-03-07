<template>
  <div>
    <p class="tip">
      使用 v-for 去循环列是不建议的<span class="green">（建议动态列使用 <grid-api-link name="vxe-grid"/> 进行渲染）</span><br>
      如果列信息发生变动，则需要通过调用 <table-api-link prop="refreshColumn"/> 方法刷新列信息<br>
      <span class="red">（注：动态更新属性必须要先定义，否则将失去自动响应）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="addColumn()">最后增加一列</vxe-button>
        <vxe-button @click="removeColumn()">删除最后一列</vxe-button>
        <vxe-button @click="updateSexFilter()">修改sex列筛选条件</vxe-button>
        <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
        <vxe-button @click="updateWidthColumn(2, 500)">修改第三列宽度</vxe-button>
        <vxe-button @click="updateWidthColumn(3, 500)">修改第四列宽度</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border="inner"
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="300"
      :data="tableData">
      <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { type: 'seq', width: 60, fixed: null },
        { type: 'checkbox', width: 50, fixed: null },
        { field: 'name', title: 'Name', width: 200 },
        { field: 'nickname', title: 'Nickname', width: 300 },
        { field: 'sex', title: 'Sex', width: 200, filters: [{ value: '1', label: '男' }] },
        { field: 'role', title: 'Role', width: 200 },
        { field: 'address', title: 'Address', width: 300, showOverflow: true }
      ],
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="addColumn()">最后增加一列</vxe-button>
            <vxe-button @click="removeColumn()">删除最后一列</vxe-button>
            <vxe-button @click="updateSexFilter()">修改sex列筛选条件</vxe-button>
            <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
            <vxe-button @click="updateWidthColumn(2, 500)">修改第三列宽度</vxe-button>
            <vxe-button @click="updateWidthColumn(3, 500)">修改第四列宽度</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border="inner"
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="300"
          :data="tableData">
          <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'seq', width: 60, fixed: null },
                { type: 'checkbox', width: 50, fixed: null },
                { field: 'name', title: 'Name', width: 200 },
                { field: 'nickname', title: 'Nickname', width: 300 },
                { field: 'sex', title: 'Sex', width: 200 },
                { field: 'role', title: 'Role', width: 200 },
                { field: 'address', title: 'Address', width: 300, showOverflow: true }
              ],
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          methods: {
            addColumn () {
              const uniqueId = XEUtils.uniqueId()
              this.tableColumn.push({
                field: \`new_\${uniqueId}\`,
                title: \`新列_\${uniqueId}\`,
                minWidth: 100
              })
            },
            removeColumn () {
              this.tableColumn.pop()
            },
            updateSexFilter () {
              const xTable = this.$refs.xTable
              const column = xTable.getColumnByField('sex')
              // 修改筛选列表，并默认设置为选中状态
              xTable.setFilter(column, [
                { value: '1', label: '男' },
                { value: '0', label: '女', checked: true }
              ])
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            },
            toggleFixedColumn (index, value) {
              const xTable = this.$refs.xTable
              this.tableColumn[index].fixed = this.tableColumn[index].fixed ? null : value
              // 更改了列属性，需要手动刷新列
              this.$nextTick(() => {
                // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
                xTable.refreshColumn().then(() => xTable.refreshScroll())
              })
            },
            updateWidthColumn (index, value) {
              this.tableColumn[index].width = value
              // 更改了列属性，需要手动刷新列
              this.$nextTick(() => {
                this.$refs.xTable.refreshColumn()
              })
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    addColumn () {
      const uniqueId = XEUtils.uniqueId()
      this.tableColumn.push({
        field: `new_${uniqueId}`,
        title: `新列_${uniqueId}`,
        minWidth: 100
      })
    },
    removeColumn () {
      this.tableColumn.pop()
    },
    updateSexFilter () {
      const xTable = this.$refs.xTable
      const column = xTable.getColumnByField('sex')
      // 修改筛选列表，并默认设置为选中状态
      xTable.setFilter(column, [
        { value: '1', label: '男' },
        { value: '0', label: '女', checked: true }
      ])
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    },
    toggleFixedColumn (index, value) {
      const xTable = this.$refs.xTable
      this.tableColumn[index].fixed = this.tableColumn[index].fixed ? null : value
      // 更改了列属性，需要手动刷新列
      this.$nextTick(() => {
        // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
        xTable.refreshColumn().then(() => xTable.refreshScroll())
      })
    },
    updateWidthColumn (index, value) {
      this.tableColumn[index].width = value
      // 更改了列属性，需要手动刷新列
      this.$nextTick(() => {
        this.$refs.xTable.refreshColumn()
      })
    }
  }
}
</script>
