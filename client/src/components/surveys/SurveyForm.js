// SurveyForm shows a form for user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Redirect } from 'react-router';
import validateEmails from '../../utils/validateEmails';
import formFields from '../surveys/formFields';

class SurveyForm extends Component {
  state = { redirect: false };
  
  renderFields() {
    return _.map(formFields, ({ label, name }) => 
      <Field key={name} component={SurveyField} label={label} name={name} type="text" />
    ); 
  }

  onCancelClick = () => {
    this.setState(this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/surveys" />;
    }

    return (
      <div>
        <h5>Create New Survey</h5>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <button className="red accent-2 flat left btn" onClick={this.onCancelClick} type="button">
            Cancel<i className="material-icons right">block</i>
          </button>
          <button className="green right btn white-text" type="submit">
            Next<i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

/**
 * @description This validation function is used by redux forms to perform validations on the
 * the survey form fields. Redux forms is able to map properties on the returned error object 
 * to the field names in the redux form provided by this component. For example, errors.title
 * = 'titles are required' would cause the 'titles are required' message to field with the name
 * set to  'title'. In other words, the error-object keys should correspond 1:1 with the redux 
 * form-field 'name' property values.
 * @param {object} values - Values which represent user input on the redux form.
 * @returns {object} Returns object with keys corresponding to the form fields with validation
 * issues.
 */
function validate(values) {
  const errors = {};
  
  errors.recipients = validateEmails(values.recipients || '');

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = `A survey ${name} must be provided`;
    }
  });

  return errors;
}

// reduxForm adds the this.props.handleSubmit
export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false, 
})(SurveyForm);