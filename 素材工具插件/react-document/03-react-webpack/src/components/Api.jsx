import React, { useRef, useEffect } from 'react'

// React.Children 一空

const Children = (props) => {
  console.log('props', props)

  const ref = React.useRef(null)

  useEffect(() => {
    console.log('ref', ref)
  }, [])

  return React.Children.map(props.children, function (child, index) {
    console.log(child)
    return React.cloneElement(child, child.type ==='div' ? { ref: el => ref.current = el } : {})
  }) || null
  // return (props.children || []).map(function (child, index) {
  //   return <li key={index}>{child}</li>
  // })
}

const Asd = () => {
  return <div>Asd</div>
}
class AA extends React.Component {
  render() {
    return <div>AA</div>
  }
}

export default () => {
  return (
    <div>
      <Children>
        <span a={2}>123</span>
        <div a="2">456</div>
        <Asd/>
        <AA/>
      </Children>
    </div>
  )
}