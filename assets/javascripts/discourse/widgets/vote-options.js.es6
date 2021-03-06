import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';

export default createWidget('vote-options', {
  tagName: 'div.vote-options',

  buildClasses(attrs, state) {
    return 'voting-popup-menu popup-menu hidden';
  },

  html(attrs, state){
    var contents = [];
    if (this.parentWidget.state.initialVote && !this.currentUser.super_vote_limit && this.siteSettings.feature_voting_allow_super_voting){
      contents.push(this.attach('upgrade-vote', attrs));
    }
    else{
      if (attrs.user_voted && !attrs.user_super_voted && !this.currentUser.super_vote_limit && this.siteSettings.feature_voting_allow_super_voting){
        contents.push(this.attach('add-super-vote', attrs));
      }
      if (attrs.user_voted && attrs.user_super_voted && this.siteSettings.feature_voting_allow_super_voting){
        contents.push(this.attach('remove-super-vote', attrs));
      }
      if (attrs.user_voted){
        contents.push(this.attach('remove-vote', attrs));
      }
    }
    return contents;
  }
});