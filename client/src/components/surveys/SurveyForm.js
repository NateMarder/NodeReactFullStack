// SurveyForm shows a form for user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Redirect } from 'react-router';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipients', name: 'emails' },
];

class SurveyForm extends Component {
  state = {redirect: false};
  
  renderFields() {
    return _.map(FIELDS, ({ label, name}) => {
      return (
        <Field key={name} component={SurveyField} label={label} name={name} type="text" />
      );
    }); 
  }

  onCancelClick = () => {
    this.setState(this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/surveys" />;
    }

    return (
      <>
        <form onSubmit={this.props.handleSubmit(values => {console.log(values)})}>
          {this.renderFields()}
          <button className="teal flat right btn" type="submit">
            Next<i className="material-icons right">done</i>
          </button>
          <button className="red accent-2 flat left btn" onClick={this.onCancelClick} type="button">
            Cancel<i className="material-icons right">block</i>
          </button>
        </form>
      </>
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
  
  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name }) => {
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
})(SurveyForm);