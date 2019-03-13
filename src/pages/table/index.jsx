import React, { Component } from 'react';
import { Card, Table, Spin, Modal, Button, message, } from 'antd';
import axios from './../../axios';
import Utils from './../../utils/utils'

class TableBasic extends Component {

  state={
    dataSource2:[],
    isSpinning:false,
  }

  params = {
    page:1
  }

  componentDidMount(){
    const dataSource = [
      {
        id:'0',
        userName:'Alex',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'1997-01-01',
        address:"上海环球港",
        time:'09:00'
      },{
        id:'1',
        userName:'Alex',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'1997-01-01',
        address:"上海环球港",
        time:'09:00'
      },{
        id:'2',
        userName:'Alex',
        sex:'1',
        state:'1',
        interest:'1',
        birthday:'1997-01-01',
        address:"上海环球港",
        time:'09:00'
      },
    ]

    dataSource.map((item,index)=>{
      item.key = index
    })

    this.setState({
      dataSource
    })
    this.request();
  }

  request = () => {
    let _this = this;
    this.setState({
      isSpinning:true
    })
    axios.ajax({
      url:'/tablelist',
      data:{
        params:{
          page:this.params.page
        }
      }
    }).then((res)=>{
      if(res.code === 0){
        this.setState({
          dataSource2:res.result.list,
          isSpinning:false,
          selectedRowKeys:[],
          selectKey:null,
          pagination:Utils.pagination(res,(current)=>{
            _this.params.page = current
            this.request()
          })
        })
      }
    })
  }

  onRowClick = (record,index) => {
    let selectKey = [index];
    Modal.info({
      title:'message',
      content:`${record.userName} and ${index}`
    })
    this.setState({
      selectedRowKeys:selectKey,
      selectItem:record
    })
  }

  handleDel = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item) => {
      ids.push(item.id)
    })
    Modal.confirm({
      title:'提示删除',
      content:`确定要删除${ids.join(',')}`,
      onOk:()=>{
        message.success('删除成功')
        this.request()
      }
    })
  }

  render() {

    const columns = [{
      title:'id',
      dataIndex:'id'
    },{
      title:'用户名',
      dataIndex:'userName'
    },{
      title:'性别',
      dataIndex:'sex',
      render(sex){
        return sex === 1 ? '男' : "女"
      }
    },{
      title:'框架',
      dataIndex:'state',
      render(frame){
        let config = {
          '1':"Vue",
          '2':"React",
          '3':"Angular"
        }
        return config[frame]
      }
    },{
      title:'爱好',
      dataIndex:'interest'
    },{
      title:'生日',
      dataIndex:'birthday'
    },{
      title:'地址',
      dataIndex:'address'
    },{
      title:'早期时间',
      dataIndex:'time'
    }]

    const {selectedRowKeys} = this.state

    const rowSelection = {
      type:'radio',
      selectedRowKeys,
    }

    const rowCheckSelection = {
      type:'checkbox',
      selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows)=>{
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <div>
        <Card title="basicTable">
          <Table 
            columns={columns} 
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="seniorTable">
          <Spin spinning={this.state.isSpinning}>
            <Table 
              columns={columns}
              dataSource={this.state.dataSource2}
              bordered
              pagination={false}
            />
          </Spin>
        </Card>
        <Card title="SelectedTable">
          <Spin spinning={this.state.isSpinning}>
            <Table 
              columns={columns}
              dataSource={this.state.dataSource2}
              bordered
              pagination={false}
              rowSelection = {rowSelection}
              onRow = {(record,index)=>{
                return {
                  onClick:()=>{
                    this.onRowClick(record,index)
                  }
                }
              }}
            />
          </Spin>
        </Card>
        <Card title="checkBox">
          <Spin spinning={this.state.isSpinning}>
          <div>
            <Button type="primary" onClick={this.handleDel}>Delete</Button>
          </div>
            <Table 
              columns={columns}
              dataSource={this.state.dataSource2}
              bordered
              pagination={false}
              rowSelection = {rowCheckSelection}
            />
          </Spin>
        </Card>
        <Card title="pagination">
          <Spin spinning={this.state.isSpinning}>
            <Table 
              columns={columns}
              dataSource={this.state.dataSource2}
              bordered
              pagination={this.state.pagination}
            />
          </Spin>
        </Card>
      </div>
    );
  }
}

export default TableBasic;