import React from 'react'
import { Link } from 'react-router'
import { Table } from 'antd'

const columns = [{
  title: '书名',
  dataIndex: 'name',
  key: 'name',
  render: (text, record) => <Link to={`books/${record.id}`}>{text}</Link>
}, {
  title: '借书人',
  dataIndex: 'borrowers',
  key: 'borrowers',
  width: 200,
  render: (borrowers) => {
    return borrowers && borrowers.map((borrower, index) => {
      return <span key={index} style={{ paddingRight: '5px' }}>
        {borrower.name}
      </span>
    })
  }
}, {
  title: '数量',
  dataIndex: 'quantity',
  key: 'quantity',
  width: 90
}, {
  title: '剩余',
  key: 'left',
  width: 90,
  render: (text, record) => <span>
    {record.quantity - (record.borrowers ? record.borrowers.length : 0)}
  </span>
}]

export class BookTable extends React.Component {
  render () {
    const { data } = this.props

    const pagination = {
      total: data.length,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('Current: ', current, ' PageSize: ', pageSize)
      },
      onChange: (current) => {
        console.log('Current: ', current)
      }
    }

    return (
      <Table columns={columns} dataSource={data} pagination={pagination} />
    )
  }
}

BookTable.propTypes = {
  data: React.PropTypes.array
}

export default BookTable
