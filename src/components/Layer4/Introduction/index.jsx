import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { imagesUri } from 'tion2/utils/tools';
import origin from 'tion2/components/common/origin.svg';
import utilsCss from 'tion2/components/common/utils';
import css from './css';

const imageUri = `${imagesUri}/introduction.png`;

export class MyComponent extends Component {
	onSkip = () => {
		this.props.dispatch({ type: 'INTRODUCTION_SKIP' });
	}
	render() {
		const thisClass = classnames(utilsCss.pointable, css.introduction, {
			[css.displayed]: this.props.app.view === 'intro' ||
				this.props.app.view === 'waiting',
			[css.skipped]: this.props.introduction.skipped,
		});
		const mapClass = classnames(css.map, {
			[css.untranslated]: this.props.introduction.mapUntranslated,
		});
		const imgClass = classnames({
			[css.visible]: this.props.introduction.imageVisible,
			[css.rotating]: this.props.introduction.imageRotating,
		});
		const originClass = classnames(css.origin, {
			[css.visible]: this.props.introduction.originVisible,
			[css.untranslated]: this.props.introduction.originUntranslated,
		});
		const destinationClass = classnames(css.destination, {
			[css.visible]: this.props.introduction.destinationVisible,
		});
		const distanceClass = classnames(css.distance, {
			[css.visible]: this.props.introduction.distanceVisible,
			[css.grown]: this.props.introduction.distanceGrown,
		});
		const pathLength = Math.sqrt(
			Math.pow(97, 2) + Math.pow(711, 2));
		const pathStyle = {
			strokeDashoffset: pathLength,
			strokeDasharray: pathLength,
		};
		const text1Class = classnames(css.text, css.text1, {
			[css.visible]: this.props.introduction.text1Visible,
		});
		const text2Class = classnames(css.text, css.text2, {
			[css.visible]: this.props.introduction.text2Visible,
		});
		const text3Class = classnames(css.text, css.text3, {
			[css.visible]: this.props.introduction.text3Visible,
		});
		const text4Class = classnames(css.text, css.text4, {
			[css.visible]: this.props.introduction.text4Visible,
		});
		const text5Class = classnames(css.text, css.text5, {
			[css.visible]: this.props.introduction.text5Visible,
		});
		const text6Class = classnames(css.text, css.text6, {
			[css.visible]: this.props.introduction.text6Visible,
		});
		const { language } = this.props.app;
		const i18nJsx = {
			text1: {
				en: (
					<p>
						We set out to engage Canadians
						<br />
						in a longitudinal conversation
					</p>
				),
				fr: (
					<p>
						Nous avons rencontré des Canadiens et initié
						<br />
						une conversation transversale
					</p>
				),
			},
			text2: {
				en: (
					<p>
						between the North and South
						<br />
						of our country
					</p>
				),
				fr: (
					<p>
						entre le Nord et le Sud
						<br />
						de notre pays
					</p>
				),
			},
			text3: {
				en: (
					<p>
						Inspired by Glenn Gould{'\''}s 1967
						<br />
						radio documentary <i>The Idea of North</i>
					</p>
				),
				fr: (
					<p>
						Inspiré par le documentaire radio de 1967
						<br />
						de Glenn Gould <i>The Idea of North</i>
					</p>
				),
			},
			text4: {
				en: (
					<p>
						50 years later – where does
						<br />
						this ‘idea’ live today?
					</p>
				),
				fr: (
					<p>
						50 ans plus tard,
						<br />
						Qu{'\''} en est il de cette {'"'}idée{'"'}?
					</p>
				),
			},
			text5: {
				en: <p>This is an act of listening</p>,
				fr: <p>Explorez le Nord à travers ces témoignages</p>,
			},
			skip: {
				en: 'skip intro',
				fr: 'passer l\'intro',
			},
		};
		const skipClass = classnames(css.skip, {
			[css.displayed]: this.props.app.view === 'intro' &&
				this.props.app.zoomersLoaded,
		});
		return (
			<div className={thisClass}>
				<div className={mapClass}>
					<img
						role="presentation"
						className={imgClass}
						src={imageUri}
					/>
					<div
						className={originClass}
						dangerouslySetInnerHTML={{ __html: origin }}
					/>
					<div className={destinationClass} />
					<svg className={distanceClass}>
						<path
							id="line-1"
							className={css.path}
							d="M 97,711 L 0,0"
							style={pathStyle}
						/>
					</svg>
				</div>
				<div className={text1Class}>
					{i18nJsx.text1[language]}
				</div>
				<div className={text2Class}>
					{i18nJsx.text2[language]}
				</div>
				<div className={text3Class}>
					{i18nJsx.text3[language]}
				</div>
				<div className={text4Class}>
					{i18nJsx.text4[language]}
				</div>
				<div className={text5Class}>
					{i18nJsx.text5[language]}
				</div>
				<div className={text6Class}>
					<p>
						The Idea of North 2.0
					</p>
				</div>
				<div
					className={skipClass}
					onClick={this.onSkip}
				>
					{i18nJsx.skip[language]}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	app: state.app,
	introduction: state.introduction,
});

export default connect(mapStateToProps)(MyComponent);
