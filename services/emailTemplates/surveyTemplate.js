const keys = require('../../config/keys');

module.exports = survey => `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>Please answer the following question:</h3>
        <p>${survey.body}</p>
        <div style="font-size: 14px;">
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        </div>
        <br/>
        <div>
          <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>
`;
