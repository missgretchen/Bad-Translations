import React from 'react';
import { Select, Input, Button, Flex } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

interface TranslationInputProps {
    language: string,
    setLanguage: (newLanguage: string) => void,
    text: string,
    setText: (newText: string) => void,
    onInsertSection: () => void,
    // onSplit: (textToSplit: string, index: number) => void,
    onAddLayer: () => void,
    disableAddLayer: boolean,
    onDelete: () => void,
    disableDelete: boolean,
}

const TranslationInput: React.FC<TranslationInputProps> = ({
    language,
    setLanguage,
    text,
    setText,
    onInsertSection,
    // onSplit,
    onAddLayer,
    disableAddLayer,
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
        <Flex vertical gap="small">
            <Flex gap="small">
                <Select options={languageOptions} defaultValue={language} onChange={setLanguage} style={{width: 200}}/>
                <Input defaultValue={text} onChange={(e) => setText(e.target.value)} />
                <Button shape="circle" type="primary" onClick={onInsertSection}>
                    <PlusOutlined />
                </Button>
                { disableDelete ? <span /> : <Button shape="circle" onClick={onDelete}>
                    <DeleteOutlined />
                </Button>
                }
            </Flex>
            
            { disableAddLayer ? <span /> : <Button color="primary" variant="filled" onClick={onAddLayer}>
                Add Layer
            </Button>
            }
        </Flex>
        </>
    )
}
export default TranslationInput;