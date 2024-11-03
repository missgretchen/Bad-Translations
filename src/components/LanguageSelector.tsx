import React from 'react';
import { Select } from 'antd';

/** Supported languages adapted from https://github.com/itsecurityco/to-google-translate/blob/master/supported_languages.json */
import supportedLanguages from '../assets/SupportedLanguages.json';

interface LanguageSelectorProps {
    language: string,
    setLanguage: (newLanugage: string) => void,
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    language,
    setLanguage
}) => {
    const languageOptions = supportedLanguages.map(x => ({label: x.language, value: x.code}));
    return (
        <>
        <Select options={languageOptions} defaultValue={language} onChange={setLanguage} style={{width: 200}} showSearch={true} optionFilterProp='label'/>
        </>
    )
};

export default LanguageSelector;