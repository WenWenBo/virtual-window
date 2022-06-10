import React, { PureComponent } from 'react'

export default class Scroll extends PureComponent {

    state = {
        name: '',
        scrollTop: 0,
    }

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }

    handleScroll = (e) => {
        const { clientHeight, scrollHeight, scrollTop } = e.target;
        console.log({clientHeight, scrollHeight, scrollTop})

        this.setState({ scrollTop })
    }

  render() {
    return (
      <div style={{ height: 800, overflow: 'auto' }} onScroll={this.handleScroll}>
          <div style={{ height: 3000 }}>我是内容</div>
      </div>
    )
  }
}
