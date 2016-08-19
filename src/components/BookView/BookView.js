import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import classes from './BookView.scss'

type Props = {
  book: Object
}

export class BookView extends React.Component {
  props: Props

  handleSelect (index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last)
  }

  render () {
    const { book = {} } = this.props
    console.log(book)
    return (
      <div>
        <div className={classes.item}>
          <div className={classes.img}>
            <img className={classes.imge} src='' /></div>
          <div className={classes.info}>
            <h4>{book.name}<span className={classes.rate}>
            {book.rate}<i className='fa fa-heart-o fa-lg' aria-hidden='true' /></span></h4>
            <p>[作]<em>{book.author}</em>  &nbsp;&nbsp; [译]<em>{book.translator}</em>
              &nbsp;&nbsp; publishedAt <em>{book.date}</em></p>
            <p>[借] ...... &nbsp;&nbsp; from ...... to......</p>
            <p>共......本，余......本</p>
            <p> <span className={classes.tag}>Tag</span>
              &nbsp;&nbsp;<span className={classes.tag}>Tag</span>
              &nbsp;&nbsp;<span className={classes.tag}>Tag</span></p>
          </div>
        </div>
        <Tabs className={classes.tab} onSelect={this.handleSelect} selectedIndex={2}>
          <TabList className={classes.tabList}>
            <Tab>读者评论</Tab>
            <Tab>图书内容</Tab>
            <Tab>出版信息</Tab>
            <Tab>借阅记录</Tab>
          </TabList>
          <TabPanel className={classes.tabPanel}>
            <h3>读者评论</h3>
            <p>这里是读者评论区域，请在这里留下你的评论</p>
          </TabPanel>
          <TabPanel className={classes.tabPanel}>
            <h3>图书内容</h3>
            <p>这里是图书内容区域，请在这里输入图书的内容简介</p>
          </TabPanel>
          <TabPanel className={classes.tabPanel}>
            <h3>出版信息</h3>
            <p>这里是出版信息区域，请在这里输入图书的出版信息</p>
          </TabPanel>
          <TabPanel className={classes.tabPanel}>
            <h3>借阅记录</h3>
            <p>这里是借阅记录区域，请在这里输入图书的借阅记录</p>
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default BookView
