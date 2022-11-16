// 用户名正则匹配
export function nameRule(rule, value, callback) {
  let regName = /(^[a-zA-Z0-9]{4,10}$)/;
  if (value === '') callback(new Error('请输入用户名'));
  else if (!regName.test(value)) callback(new Error('请输入4-10位用户名'));
  else callback();
}

// 密码正则匹配
export function passwordRule(rule, value, callback) {
  let regPassword = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
  if (value === '') callback(new Error('请输入密码'));
  else if (!regPassword.test(value)) callback(new Error('请输入6-12密码，必须包含小写、大写字母、数字和特殊字符'));
  else callback();
}