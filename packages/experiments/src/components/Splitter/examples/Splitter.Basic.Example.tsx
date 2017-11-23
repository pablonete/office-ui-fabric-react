
import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Splitter } from '../Splitter';

export class SplitterBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Splitter</h3>
        <Splitter collapsedLabel='Label (click here to restore)'>
          <DefaultButton>Left</DefaultButton>
          <DefaultButton>Right</DefaultButton>
        </Splitter>
      </div>
    );
  }
}
