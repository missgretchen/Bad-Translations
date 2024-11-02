import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Flex } from 'antd';
import { TranslationInput } from './components';
import { TranslationUnit } from './types';

function App() {
  const [inputLayer, setInputLayer] = useState<TranslationUnit[]>([{language: 'en', text: '', id: uuid()}]);
  const [translationLayers, setTranslationLayers] = useState<TranslationUnit[][]>([[]]);

  const setInputLanguage = (newLanguage: string, index: number) => {
    const newInputLayer = [...inputLayer];
    newInputLayer[index].language = newLanguage;
    setInputLayer(newInputLayer);
  };

  const setInputText = (newText: string, index: number) => {
    const newInputLayer = [...inputLayer];
    newInputLayer[index].text = newText;
    setInputLayer(newInputLayer);
  };

  const onInsertSection = (index: number) => {
    const newInputLayer = [...inputLayer];
    const newTranslationUnit = {language: 'en', text: '', id: uuid()};
    newInputLayer.splice(index + 1, 0, newTranslationUnit);

    const newTranslationLayers = [ ...translationLayers];
    newTranslationLayers.splice(index + 1, 0, []);
    setTranslationLayers(newTranslationLayers);
    setInputLayer(newInputLayer);
  };

  const onDeleteSection = (index: number) => {
    const newInputLayer = [...inputLayer];
    newInputLayer.splice(index, 1);
    setInputLayer(newInputLayer);
  };

  const onInsertLayer = (sectionIndex: number, layerIndex: number) => {
    const newTranslationLayers = [ ...translationLayers];
    const newTranslationUnit = {language: 'pt', text: '', id: uuid()};
    newTranslationLayers[sectionIndex].splice(layerIndex + 1, 0, newTranslationUnit);
    setTranslationLayers(newTranslationLayers);
  };

  return (
    <>
      <Flex gap="small">
        {inputLayer.map((translationUnit, index) => (
          <TranslationInput
            key={translationUnit.id}
            language={translationUnit.language}
            setLanguage={( newLanguage:string ) => setInputLanguage(newLanguage, index)}
            text={translationUnit.text}
            setText={(newText: string) => setInputText(newText, index)}
            onInsertSection={() => onInsertSection(index)}
            onAddLayer={() => onInsertLayer(index, 0)}
            disableAddLayer={translationLayers[index].length > 1}
            onDelete={() => onDeleteSection(index)}
            disableDelete={inputLayer.length === 1}
          />
        ))
        }
      </Flex>
    </>
  )
}

export default App
