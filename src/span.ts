
/**
 * 处理阶段和科目，用于合并单元格
 *
 * @param {Array<Object>} data
 * @param {Array<number>} 需要合并的单元格
 *
 * @returns {Array<Object>}
 */
 export const adaptStageSubject =  (data:Array<any>, columnIndexs = [0]) => {
  let counter:any = {}
  let allSubjects:Array<any> = []
  // 将科目打平
  data.forEach((item) => {
      item.subjects.forEach((subject:any) => {
          allSubjects.push(Object.assign(subject, {
              stageName: item.stageName,
              stagePrice: item.stagePrice,
              stageId: item.stageId,
              columnIndexs: columnIndexs
          }))
      })
  })
  allSubjects.forEach((item) => {
      if (counter[item.stageId]) {
          counter[item.stageId]++
      } else {
          counter[item.stageId] = 1
      }
  })
  let counterKeys = Object.keys(counter)
  counterKeys.forEach((id) => {
      for (let i = 0, l = allSubjects.length; i < l; i++) {
          if (Number(id) === allSubjects[i].stageId) {
              allSubjects[i].rowspan = Number(counter[id])
              allSubjects[i].rowspanstart = true
              break
          }
      }
  })
  return allSubjects
}



/**
 * 表格合并规则
 *
 * @param {Object} Object
 *
 * @returns {Object>}
 */
 export const calcTableSpan = ({ row, column, rowIndex, columnIndex }:any):any => {
  if (row.columnIndexs.indexOf(column['property']) > -1) {
      if (row.rowspan && row.rowspanstart) {
          return {
              rowspan: row.rowspan,
              colspan: 1
          }
      } else {
          return {
              rowspan: 0,
              colspan: 0
          }
      }
  }
}
