var okrsData = [
  {
    title: 'Run an internal Wordpress training session',
    complete: '0%'
  },
  {
    title: 'Document and configure best practice for MF Wordpress process',
    complete: '0%'
  },
  {
    title: 'Build an OKR tracker with Meteor/Angular',
    complete: '0%'
  }
];
Template.okrList.helpers({
  okrs: okrsData
});
