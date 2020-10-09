import React from 'react'
import PropTypes from 'prop-types'

const ProductList = ({ list }) => {
  return (
    <div>
      <h6>ProductList</h6>
      <p>{
        JSON.stringify(list)
      }</p>
    </div>
  )
}

ProductList.propTypes = {
  list: PropTypes.array.isRequired,
}

export default ProductList