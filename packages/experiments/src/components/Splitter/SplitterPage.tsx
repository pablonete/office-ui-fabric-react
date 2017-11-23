import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { SplitterBasicExample } from './examples/Splitter.Basic.Example';
const SplitterBasicExampleCode = require('!raw-loader!experiments/src/components/Splitter/examples/Splitter.Basic.Example.tsx') as string;

export class SplitterPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Splitter'
        componentName='Splitter'
        exampleCards={
          <div>
            <ExampleCard title='Basic Splitter' isOptIn={ true } code={ SplitterBasicExampleCode }>
              <SplitterBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/Splitter/Splitter.types.ts')
            ] }
          />
        }
        overview={
          <div />
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use them to represent a large collection of items visually.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them for general layout of components that are not part of the same set.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}
