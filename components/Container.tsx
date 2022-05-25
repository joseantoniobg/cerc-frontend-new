import React from "react";

const Container = ({ children }) => {
    return <div style={{paddingTop: '1rem', paddingRight: '1rem', paddingLeft: '1rem'}}>
      {children}
    </div>
}

export default Container;