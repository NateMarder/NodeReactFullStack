import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';


class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div class="card blue lighten-5" key={survey._id}>
          <div style={{padding: '15px'}} class="card-content">
            <span className="right">{new Date(survey.dateSent).toLocaleDateString()}</span>
            <span style={{ margin: 0 }}  class="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <div style={{margin: '15px 0 0 0', padding: '5px 0'}} className="card-action">
              <a style={{color: '#039be5'}} href="/">Yes: {survey.yes}</a>
              <a style={{ color: '#039be5'}} href="/">No: {survey.no}</a>
            </div>
          </div>
        </div>
      );
    })
  }

  render() {
    return this.renderSurveys(); 
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
