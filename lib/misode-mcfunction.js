'use babel';

import MisodeMcfunctionView from './misode-mcfunction-view';
import { CompositeDisposable } from 'atom';

export default {

  misodeMcfunctionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.misodeMcfunctionView = new MisodeMcfunctionView(state.misodeMcfunctionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.misodeMcfunctionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'misode-mcfunction:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.misodeMcfunctionView.destroy();
  },

  serialize() {
    return {
      misodeMcfunctionViewState: this.misodeMcfunctionView.serialize()
    };
  },

  toggle() {
    console.log('MisodeMcfunction was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
