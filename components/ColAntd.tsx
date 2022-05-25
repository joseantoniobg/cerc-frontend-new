import { Col } from "antd"
import React from "react"

const ColAntd = ({ md, lg, children }) => {
  return ( <Col xs={24} sm={24} md={md} lg={lg}>
        {children}
    </Col>)
}

export default ColAntd;