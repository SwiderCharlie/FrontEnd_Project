// 获取表格数据
export function getData(root, url, params) {
  root.request.get(url, { params: params || {} })
    .then(res => {
      if (res.data.status === 200) {
        root.tableData = res.data.data;
        root.total = res.data.total;
      }
    })
    .catch(err => { throw err });
}

// 新增修改方法封装
import qs from 'qs'
export function changeInfo(root, method, url, form, callback) {
  let data = qs.stringify(data);
  root.request[method](url, data).then(res => {
    if (res.data.status === 200) {
      callback(root, url);
      root.dialogFormVisible = false;
      root.$message({ type: 'success', message: res.data.message });
    }
  }).catch(error => { throw error });
}

// 删除方法封装
export function delData(root, url, id, callFun) {
  root.$alert('你确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    callback: () => {
      root.request.delete(`${url}/${id}`).then(res => {
        if (res.data.status === 200) {
          callFun(root, url);
          root.$message({message: res.data.message, type: 'success'})
        }
      }).catch(error => {throw error})
    }
  })
}

// 作业列表获取表格数据方法封装
export function getTableData(root, url, params, arr) {
  root.request.get(url, { params: params || {} })
    .then(res => {
      if (res.data.status === 200) {
        root.tableData = res.data.data;
        root.total = res.data.total;
        root.tableData.map(item => {
          arr.map(aItem => {
            item[aItem] ? item[aItem + '_text'] = '是' : item[aItem + '_text'] = '否';
          });
        });
        root.loading = false;  // 取消加载动画
      }
    })
    .catch(err => { throw err });
}