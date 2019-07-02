// SurveyForm shows a form for user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Redirect } from 'react-router';

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipients', name: 'recipientList' },
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

// reduxForm adds the this.props.handleSubmit
export default reduxForm({
  form: 'surveyForm',
})(SurveyForm);