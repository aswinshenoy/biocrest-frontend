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
                <a target="_blank" href={submission.fileURL}>
                    <img alt={field.label} draggable="false" src={submission.fileURL} />
                </a> :
            field?.formats === 'audio/*' ?
            <audio controls className="w-100 mt-2">
                <source src={submission.fileURL ? submission.fileURL : submission.url} />
            </audio> :
            <a target="_blank" href={submission.fileURL}>Download</a>
            }
        </div>
    </div>

};

export default SubmissionPreview;