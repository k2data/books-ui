import React from 'react'
import { Select } from 'antd'
import { VIEWS as views } from 'routes/Home/modules/filter'
const Option = Select.Option

const viewOptions = views.map(view => <Option key={view}>{view}</Option>)
export const ViewSelector = (props) => (
  <div style={{ display: 'inline-block' }}>
    <Select value={props.view}
      style={{ width: 90 }}
      onChange={props.onChange}>
      {viewOptions}
    </Select>
  </div>
)

ViewSelector.propTypes = {
  view: React.PropTypes.string,
  onChange: React.PropTypes.func
}

export default ViewSelector
