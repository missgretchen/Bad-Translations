import React from 'react';
import { Select, Input, Button } from 'antd';

interface TranslationInputProps {
    language: string,
    setLanguage: (newLanguage: string) => void,
    text: string,
    setText: (newText: string) => void,
    onAddLayer: () => void,
    onAddSection: () => void,
    // onSplit: (textToSplit: string, index: number) => void,
    onDelete: () => void,
    disableDelete: boolean,
}

const TranslationInput: React.FC<TranslationInputProps> = ({
    language,
    setLanguage,
    text,
    setText,
    onAddLayer,
    onAddSection,
    // onSplit,
    onDelete,
    disableDelete,
}) => {

    const languageOptions: object[] = [
        {label: 'English', value: 'en'},
        {label: 'Spanish', value: 'sp'},
        {label: 'Portuguese', value:'pt'}
    ];
    return (
        <>
        <Select options={languageOptions} defaultValue={language} onChange={setLanguage} />
        <Input defaultValue={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={onAddSection}>
            Add Section
        </Button>
        { disableDelete ?<Button onClick={onDelete}>
            Remove Section
        </Button> :
        <span /> }
        <Button onClick={onAddLayer}>
            Add Layer
        </Button>
        </>
    )
}
export default TranslationInput;