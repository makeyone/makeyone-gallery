import { Component } from 'react';

export default class DisableBodyScroll extends Component {
  componentDidMount() {
    document.body.classList.add('disable-body-scroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('disable-body-scroll');
  }

  render() {
    return false;
  }
}
