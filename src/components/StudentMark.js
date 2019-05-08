import React from 'react'
import 'antd/dist/antd.css'
import { Button, Table, Row, Input, Icon } from 'antd'
import Highlighter from 'react-highlight-words';

const Search = Input.Search;
export default class StudentMark extends React.Component {
  state = {
    data: [
    {
      id: "d3565f95-813c-495d-8cd3-76d287413749",
      name: "Ann-marie",
      class: "S-6",
      birthday: "08/12/1997",
      math: 2,
      physical: 9,
      chemical: 9
    }, {
      id: "22511281-bbcd-4c82-bda4-79fb9a0321b6",
      name: "Ravid",
      class: "N-5",
      birthday: "03/30/2000",
      math: 4,
      physical: 5,
      chemical: 5
    }, {
      id: "1a3fded0-fb97-41bd-8fca-229e17844b6d",
      name: "Karrah",
      class: "V-3",
      birthday: "01/09/1993",
      math: 1,
      physical: 2,
      chemical: 5
    }, {
      id: "65c5a06d-2180-4551-8eb4-4d023416469a",
      name: "Glennie",
      class: "C-1",
      birthday: "06/23/1995",
      math: 2,
      physical: 6,
      chemical: 10
    }, {
      id: "0a9f52ba-d1c1-458a-bcc0-2e2d132c5b57",
      name: "Mariam",
      class: "Z-0",
      birthday: "08/26/1999",
      math: 0,
      physical: 9,
      chemical: 1
    }, {
      id: "9eea505e-26cc-4036-a8d0-a54a32119ccd",
      name: "Josee",
      class: "L-3",
      birthday: "01/11/1998",
      math: 3,
      physical: 8,
      chemical: 10
    }, {
      id: "61f38206-5da1-4c52-b87f-be89f6d7bcf3",
      name: "Stepha",
      class: "S-7",
      birthday: "05/05/2000",
      math: 3,
      physical: 10,
      chemical: 6
    }, {
      id: "eddd899d-82fd-4b5b-8743-6bd53056d8a3",
      name: "Kaile",
      class: "U-7",
      birthday: "04/26/1993",
      math: 9,
      physical: 10,
      chemical: 9
    }, {
      id: "f4e43b20-5e6e-4fc0-9082-69b89bb3ca39",
      name: "Manon",
      class: "O-8",
      birthday: "10/15/1993",
      math: 10,
      physical: 0,
      chemical: 8
    }, {
      id: "dc50ac09-d642-45a6-9cec-7cc3461aed59",
      name: "Row",
      class: "G-6",
      birthday: "07/17/1997",
      math: 3,
      physical: 10,
      chemical: 9
    }],
    searchText: '',
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
  // filter = (keyWord) => {
  //   if (keyWord) {
  //     const dataShadow = [...this.state.data]
  //     this.setState({
  //       data: dataShadow.filter(student => {
  //         return student.name.toLowerCase().includes(keyWord.toLowerCase())
  //       })
  //     })
  //   }
  // }
  render() {
    let { data } = this.state
    const columns = []
    const subjects = [
      'math', 'physical', 'chemical'
    ]
    const numberOfColumn = [
      'name',
      'class',
      'birthday',
      ...subjects
    ]
    for (let [index, value] of numberOfColumn.entries()) {
      // console.log(value)
      const obj = {
        key: `col-${index}`,
        title: value.toUpperCase(),
        width: 100,
        ...this.getColumnSearchProps(value),
        render: (text, record) => {
          return <span>{record[value]}</span>
        }
      }
      columns.push(obj)
    }
    const pagination={position: 'bottom', pageSize: 5}
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          bordered
          rowKey='key'
        />
      </div>
    )
  }
}
