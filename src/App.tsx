import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Flex} from 'antd';
import { TranslationInput, TranslationLayer } from './components';
import { TranslationUnit } from './types';

function App() {
  const [inputLayer, setInputLayer] = useState<TranslationUnit[]>([{language: 'en', text: '', id: uuid()}]);
  const [translationLayers, setTranslationLayers] = useState<TranslationUnit[][]>([[]]);
  const [outputLayer, setOutputLayer] = useState<TranslationUnit>({language: 'pt', text: '', id: uuid()});

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

  const getParentTranslationUnit = (sectionIndex: number, layerIndex: number) => {
    if(layerIndex === 0) {
      return inputLayer[sectionIndex];
    }
    return translationLayers[sectionIndex][layerIndex - 1];
  }

  const setOutputText = (newText: string, sectionIndex: number, layerIndex: number) => {
    const newTranslationLayers = [ ...translationLayers];
    newTranslationLayers[sectionIndex][layerIndex].text = newText;
    setTranslationLayers(newTranslationLayers);
  }

  const setOutputLanguage = (newLanguage: string, sectionIndex: number, layerIndex: number) => {
    const newTranslationLayers = [ ...translationLayers];
    newTranslationLayers[sectionIndex][layerIndex].language = newLanguage;
    setTranslationLayers(newTranslationLayers);
  }

  const getAllAncestorTranslationUnits = ():TranslationUnit[] => {
    const allAncestors: TranslationUnit[] = [];
    translationLayers.forEach((sectionLayerList: TranslationUnit[], sectionIndex: number) => {
      if(sectionLayerList.length === 0) {
        allAncestors.push(inputLayer[sectionIndex])
      } else {
        allAncestors.push(sectionLayerList[sectionLayerList.length - 1])
      }
    });
    return allAncestors;
  };

  const updateOutputLayer = (newText: string|null, newLanguage: string|null) => {
    const newOutputLayer = { ...outputLayer};
    if(newText) { newOutputLayer.text = newText;}
    if(newLanguage) { newOutputLayer.language = newLanguage;}
    setOutputLayer(newOutputLayer);
  }

  return (
    <>
      <Flex gap="small">
        {inputLayer.map((inputTranslationUnit, sectionIndex) => (
          <Flex gap="small" vertical key={sectionIndex}>
            <TranslationInput
              key={inputTranslationUnit.id}
              language={inputTranslationUnit.language}
              setLanguage={( newLanguage:string ) => setInputLanguage(newLanguage, sectionIndex)}
              text={inputTranslationUnit.text}
              setText={(newText: string) => setInputText(newText, sectionIndex)}
              onInsertSection={() => onInsertSection(sectionIndex)}
              onAddLayer={() => onInsertLayer(sectionIndex, 0)}
              disableAddLayer={translationLayers[sectionIndex].length > 0}
              onDelete={() => onDeleteSection(sectionIndex)}
              disableDelete={inputLayer.length === 1}
            />
          {translationLayers[sectionIndex].map((translationLayerUnit, layerIndex) => (
            <TranslationLayer
              key={translationLayerUnit.id}
              ancestorTranslations={[getParentTranslationUnit(sectionIndex, layerIndex)]}
              outputText={translationLayerUnit.text}
              setOutputText={(newText: string) => setOutputText(newText, sectionIndex, layerIndex)}
              outputLanguage={translationLayerUnit.language}
              setOutputLanguage={(newLanguage: string) => setOutputLanguage(newLanguage, sectionIndex, layerIndex)}
            />
          ))}
        </Flex>
        ))
        }
      </Flex>
      <TranslationLayer
        ancestorTranslations={getAllAncestorTranslationUnits()}
        outputText={outputLayer.text}
        setOutputText={(newText: string) => updateOutputLayer(newText, null)}
        outputLanguage={outputLayer.language}
        setOutputLanguage={(newLanguage: string) => updateOutputLayer(null, newLanguage)}
      />
    </>
  )
}

export default App
