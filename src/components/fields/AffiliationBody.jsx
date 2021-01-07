import React from 'react';
import {useMutation, useQuery} from "graphql-hooks";
import AsyncCreatableSelect from 'react-select/async-creatable';
import debounce from "lodash/debounce";

import {ADD_AFFILIATION_BODY, AFFILIATION_BODY_QUERY} from "../../graphql/queries/affiliation";

const AffiliationBody = ({
    value, onChange = () => {},
    isAcademician = false, isStudent = false, isIndustry = false,
}) => {

    const {
        loading: bodyLoading,
        error: bodyError,
        data: bodyList,
        refetch: refetchBodies
    } = useQuery(AFFILIATION_BODY_QUERY)

    const [createAffiliationBody] = useMutation(ADD_AFFILIATION_BODY);

    const asyncLoadBodies = debounce((keyword, callback) => {
        refetchBodies({ variables: { keyword }}).then(({ data }) => {
            if (data?.affiliationBodies) {
                callback(data.affiliationBodies);
            }
        })
    }, 500);

    const handleCreate = (name) => {
        createAffiliationBody({ variables: { name }}).then(({ data, error }) => {
            if(data?.addAffiliationBody){
                onChange(data.addAffiliationBody);
            }
        })
    }

    return <div>
        <label style={{ fontWeight: 500 }} className="px-1 mb-1 text-dark">
            {isStudent ? 'College / School' :
                isAcademician ? 'Institution' :
                    isIndustry ? 'Organization / Company'
                        : 'Affiliation Body'
            }
        </label>
        <AsyncCreatableSelect
            id="affiliation-body-input"
            placeholder="Enter/Select Affiliation Body"
            onChange={onChange}
            value={value}
            onCreateOption={handleCreate}
            cacheOptions
            defaultOptions={bodyList?.affiliationBodies}
            loadOptions={asyncLoadBodies}
        />
    </div>;

};

export default AffiliationBody;