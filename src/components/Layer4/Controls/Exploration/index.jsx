import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import dropdownCss from 'tion2/components/common/dropdown.css';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

export class MyComponent extends Component {
  componentDidUpdate() {
    if (
      this.props.app.isLight &&
      this.props.app.zoomersLoaded &&
      this.props.app.view === 'waiting'
    ) {
      this.props.dispatch({
        type: 'EXPLORATION_CLICK',
        mode: 'interactive',
        confirm: true,
      });
    }
  }
  onMouseEnter = () => {
    if (this.props.app.view !== 'home' && this.props.app.view !== 'waiting') {
      this.props.dispatch({ type: 'EXPLORATION_MOUSE_OVER' });
    }
  };
  onMouseLeave = () => {
    if (this.props.app.view !== 'home' && this.props.app.view !== 'waiting') {
      this.props.dispatch({ type: 'EXPLORATION_MOUSE_LEAVE' });
    }
  };
  onTourClick = () => {
    this.props.dispatch({
      type: 'EXPLORATION_CLICK',
      mode: 'tour',
      confirm: true,
    });
  };
  onInteractiveClick = () => {
    this.props.dispatch({
      type: 'EXPLORATION_CLICK',
      mode: 'interactive',
      confirm: true,
    });
  };
  render() {
    const explorationClass = classnames(
      dropdownCss.dropdown,
      utilsCss.pointable,
      css.exploration,
      {
        [css.displayed]: this.props.app.view !== 'intro',
        [dropdownCss.hovered]: this.props.exploration.hovered,
        [css.centered]: this.props.exploration.centered,
        [css.open]: this.props.exploration.open,
        [css.split]: this.props.exploration.split,
        [css.descriptive]: this.props.exploration.descriptive,
      },
    );
    const tourClass = classnames(css.tour, {
      [dropdownCss.selected]: this.props.exploration.mode === 'tour',
    });
    const interactiveClass = classnames(css.interactive, {
      [dropdownCss.selected]: this.props.exploration.mode === 'interactive',
    });
    const { language } = this.props.app;
    const i18nJsx = {
      tour: { en: 'Guided tour', fr: 'Tour guidé' },
      tourDescription: {
        en: 'Take me on a journey',
        fr: 'Emmène-moi en voyage',
      },
      interactive: { en: 'Interactive', fr: 'Interactif' },
      interactiveDescription: {
        en: 'Explore independently',
        fr: 'Explorer indépendamment',
      },
    };
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={explorationClass}
      >
        <div className={tourClass} onClick={this.onTourClick}>
          {i18nJsx.tour[language]}
          <div className={css.description}>
            {i18nJsx.tourDescription[language]}
          </div>
        </div>
        <div className={interactiveClass} onClick={this.onInteractiveClick}>
          {i18nJsx.interactive[language]}
          <div className={css.description}>
            {i18nJsx.interactiveDescription[language]}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  exploration: state.exploration,
});

export default connect(mapStateToProps)(MyComponent);
