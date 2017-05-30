import React, { Component } from "react";
import { connect } from "react-redux";
import InterviewCover from "tion2/components/common/InterviewCover";

export class MyComponent extends Component {
  render() {
    const interviewCoversContent = this.props.interviews.originData.map(
      interview =>
        Object.assign(
          <InterviewCover key={interview._id} interview={interview} />
        )
    );
    return (
      <div>
        {interviewCoversContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({ interviews: state.interviews });

export default connect(mapStateToProps)(MyComponent);
