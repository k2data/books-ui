import { connect } from 'react-redux'
import BooksFilter from 'components/BooksFilter'

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(BooksFilter)

// useless
