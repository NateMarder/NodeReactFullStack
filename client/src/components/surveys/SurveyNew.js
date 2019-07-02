// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
      <SurveyFormReview
        onCancel={() => { this.setState({ showFormReview: false })}} 
      />
      );
    }

    return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })}/>;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

/**
 * @description By not specifying the 'destroyOnUnmount: false' property, we have told
 * redux form to clear all the within the redux form when this SurveyNew component is totally
 * unmounted.SurveyReview and SurveyNew are technically children within this component, which
 * is why the form data persists when users go back and forth between those elements, but
 * then the data is lost when the user navigates away using any means at their disposal.
 */
export default reduxForm({
  form: 'surveyForm',
})(SurveyNew);