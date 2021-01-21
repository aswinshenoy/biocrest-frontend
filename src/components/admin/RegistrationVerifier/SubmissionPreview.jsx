import React from 'react';

const SubmissionPreview = ({
    field, submission
}) => {


    return <div className="card p-2">
        <div className="font-weight-bold mb-2">
            {field?.label ? field.label : submission.key}
        </div>
        {submission.url}
        <div>
            {field?.formats === 'image/*' ?
                <img draggable="false" src={submission.fileURL} /> :
                <a target="_blank" href={submission.fileURL}>Download</a>
            }
        </div>
    </div>

};

export default SubmissionPreview;