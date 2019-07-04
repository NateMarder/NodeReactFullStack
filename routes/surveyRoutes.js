const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Mailer = require('../services/Mailer');

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Your feedback has been recorded, thanks for participating!');
  });

  /**
   *  @description This executes a mongo query that actually
   *  updates our data. doing it on the mongo server is the right way.
   */
  function mongoUpdateSurveyQuery({ surveyId, email, choice }) {
    const findObjectWhere = {
      _id: surveyId,
      recipients: {
        $elemMatch: { email, responded: false },
      },
    };

    const updateWith = {
      $inc: { [choice]: 1 }, // updates the number of yes or no responses in the survey
      $set: { 'recipients.$.responded': true }, // updates the specific recipient who made a choice
      lastResponded: new Date(),
    };

    Survey.updateOne(findObjectWhere, updateWith).exec();
  }

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = Path.createPath('/api/surveys/:surveyId/:choice'); // p is a parser object

    _.chain(req.body)
      .map(({ url, email }) => {
        const { pathname } = new URL(url);
        const match = p.test(pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(event => mongoUpdateSurveyQuery(event))
      .value();

    res.send({});
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey
      .find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  /**
   * @description This endpoint takes data from the frontside app, transforms
   * it into a new survey object, attempts to send off the survey via a mailer
   * object which wraps some sendgrid functionality. Depending on the success
   * of the operation, corresponding objects are saved in the mongoose db.
   */
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {
      title,
      subject,
      body,
      recipients,
    } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
