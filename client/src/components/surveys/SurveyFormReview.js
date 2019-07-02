// SurveyFormReview allow user to review survey they are about to save

import React from 'react'
import { connect } from 'react-redux';
import formFields from '../surveys/formFields';
import _ from 'lodash';
import * as actions from '../../actions/index';
import { withRouter } from 'react-router-dom';

/**
 * @description This component provides a mechanism whereby the user can review
 * and approve their survey one last time before sending it out.
 * @param {object} history - This object is provided by the withRouter helper,
 * which itslef is provided by the react-router library. The history object 
 * enables to redirect the user after the send/submit survey action happens.
 */
const SurveyFormReview = ({ onCancel, submitSurvey, formValues, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} style={{ marginBottom: '10px' }}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div style={{ margin: '15px 0' }}>
      <h5>Confirm Your New Survey</h5>
      <div style={{ marginBottom: '15px' }}>
        <div>
          {reviewFields}
        </div>
      </div>
      <button className="yellow darken-2 left btn" onClick={onCancel} type="button">
        back<i className="material-icons left">arrow_back</i>
      </button>
      <button 
        className="green right btn white-text" 
        onClick={() => submitSurvey(formValues, history)}
        type="button"
      >
        send survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};

/**
 * @description This function is used by the react-redux library to synchronize 
 * data from the state and props. Logically speaking, this function intends to 
 * transform relevant objects from the redux-state to accessible props used by 
 * this component.
 * @param {object} state - State object representing the redux state. The data
 * we care about within this object is namespaced to the following: 
 * state > form > surveyForm > values
 * @returns {object} Returns an object that is merged with this components other 
 * props and available for use as the it is being mounted. 
 */
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
