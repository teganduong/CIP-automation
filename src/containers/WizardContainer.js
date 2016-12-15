import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cipActions from '../actions/cip-actions';
import WizardForm from '../components/WizardForm';

const mapStateToProps = ({ cip, account, ui, node, currentDoc, page, creditLimit, forms }) => ({ 
  cip, account, ui, node, currentDoc, page, creditLimit, forms 
});

const mapDispatchToProps = (dispatch) => ({ 
  dispatch,
  cipActions: bindActionCreators(cipActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);