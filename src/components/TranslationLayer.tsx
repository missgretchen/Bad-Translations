import React, { useEffect, useState } from 'react';
import { Flex, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { TranslationUnit } from '../types';
import LanguageSelector from './LanguageSelector';

interface TranslationLayerProps {
    ancestorTranslations: TranslationUnit[],
    outputText: string,
    setOutputText: (newText: string) => void,
    outputLanguage: string,
    setOutputLanguage: (newLanguage: string) => void,
    allowClear: boolean,
    onClear: () => void,
}

const TranslationLayer: React.FC<TranslationLayerProps> = ({
    ancestorTranslations,
    outputText,
    setOutputText,
    outputLanguage,
    setOutputLanguage,
    allowClear = false,
    onClear,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const translateAndUpdate = async (ancestorTranslations: TranslationUnit[], outputLanguage: string ) => {
        function getRandomInt(max: number) {
            return Math.floor(Math.random() * max);
          }
          
        const responses = await Promise.all(ancestorTranslations.map((translationUnit) => (new Promise<string>((resolve) => {
            setTimeout(() => resolve(`${translationUnit.text} (translated from ${translationUnit.language} to: ${outputLanguage})`), getRandomInt(2000));
        }))))
        const result = responses.join(' ');
        // setting the output text will trigger a rerender in other layers, so if theres no change
        // we shouldn't reset it, otherwise will fall into infinite update loop
        if( result !== outputText) { setOutputText(result) };
        setLoading(false);
        console.log(responses);

    };

    useEffect(() => {
        setLoading(true);
        translateAndUpdate(ancestorTranslations, outputLanguage);
    }, [ancestorTranslations, outputLanguage]);

    return (
        <>
        <Flex gap="small">
            <LanguageSelector language={outputLanguage} setLanguage={setOutputLanguage} />
            { loading ? 'Loading ...' : outputText }
            { allowClear ? <Button shape="circle" onClick={onClear}>
                    <DeleteOutlined />
                </Button> : <span /> 
                }
        </Flex>
        </>
    )
}

export default TranslationLayer;
