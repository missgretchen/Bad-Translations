import { useMemo, useState } from 'react';
import { TranslationInput } from './components';

function App() {
  const layers : object[][] = [[{language: 'en', text: ''}]];
  const language: string = 'en';
  const text: string = '';

  const setLanguage = (newLanguage: string, layerIndex: number, sectionIndex: number) => {
    console.log(newLanguage);
    console.log(layerIndex);
    console.log(sectionIndex);
  };

  const setText = (newText: string, layerIndex: number, sectionIndex: number) => {
    console.log(newText);
    console.log(layerIndex);
    console.log(sectionIndex);
  };

  const onAddSection = (layerIndex: number, sectionIndex: number) => {
    console.log('Add section')
  };

  const onAddLayer = (layerIndex: number, sectionIndex: number) => {
    console.log('Add layer')
  };

  const deleteDisabled = useMemo<boolean>(() => {
    return layers.length === 1 && layers[0].length === 1;
  }, [layers]);

  const onDeleteSection = (layerIndex: number, sectionIndex: number) => {
    console.log('delete');
  };
  return (
    <>
      <div>
      <TranslationInput
        language={language}
        setLanguage={( newLanguage:string ) => setLanguage(newLanguage, 0, 0)}
        text={text}
        setText={(newText: string) => setText(newText, 0, 0)}
        onAddLayer={() => onAddLayer(0,0)}
        onAddSection={() => onAddSection(0,0)}
        onDelete={() => onDeleteSection(0,0)}
        deleteDisabled={deleteDisabled}
      />
      </div>
    </>
  )
}

export default App
