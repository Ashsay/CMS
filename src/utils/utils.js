import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {

  formateDate(time){
    if(!time) return '';
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
  },
  
  pagination(data,callback){
    return {
      onChange:(current)=>{
        callback(current)
      },
      current:data.result.page,
      pageSize:data.result.page_size,
      total:data.result.total,
      showTotal:()=>{
        return `共${data.result.total}条`
      }
    }
  },

      // 格式化金额,单位:分(eg:430分=4.30元)
  formatFee(fee, suffix = '') {
    if (!fee) {
      return 0;
    }
    return Number(fee).toFixed(2) + suffix;
  },
  // 格式化公里（eg:3000 = 3公里）
  formatMileage(mileage, text) {
    if (!mileage) {
      return 0;
    }
    if (mileage >= 1000) {
      text = text || " km";
        return Math.floor(mileage / 100) / 10 + text;
    } else {
      text = text || " m";
      return mileage + text;
    }
  },
  // 隐藏手机号中间4位
  formatPhone(phone) {
    phone += '';
    return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
  },
  // 隐藏身份证号中11位
  formatIdentity(number) {
    number += '';
    return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
  },

  getOptionList(data){
    if(!data){
      return []
    }
    // let option = [<Option value="0" key="all_key">全部</Option>];
    let option = [];
    data.map((item)=>{
      return option.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return option
  }

}